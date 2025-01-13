import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserLoginDto, UserSignupDto } from './auth.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as XLSX from 'xlsx';
import {
    uniq,
  } from 'lodash';
import { ChatHistory } from './entity/chatHistory.entity';

@Injectable()
export class AuthService { 
constructor(   private em: EntityManager,     private jwtService: JwtService,){}
    async signup(dto:UserSignupDto){
        const isUserExists = await this.em.findOne(User, {
            email: dto.email
        } )
        // todo: encode password if time permits
        if(isUserExists){
            throw new BadRequestException('User Already exists')
        }


        const newUser = new User({
            name: dto.name,
            email: dto.email,
            password: dto.password
        })
        
        this.em.persistAndFlush(newUser)

        return {success: true}

    }

    async login(dto: UserLoginDto){
        const user = await this.em.findOneOrFail(User, {
            email: dto.email
        } )

        return {
            userToken: this.jwtService.sign(
              {
                email: user.email,
              },
              {
                expiresIn: '1d',
              },
            ),
          };



    }

    async getUser(email: string){
        const user = await this.em.findOneOrFail(User, {
            email: email
        } )

        return user

    }

    async uploadFromExcel(user: User, file:Express.Multer.File,){
        const workbook = XLSX.read(file.buffer);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json: XLSX.WorkSheet[] = XLSX.utils.sheet_to_json(worksheet);


        const userChatData  = json.map((p) => {
            return {
                chatId: p['Chat ID'],
                message: p['Message'],
                timestamp: new Date(p['Timestamp']),
                senderEmail: p['Sender Email'],
                messageType: p['Message Type'],
                isRead: p['Is Read']
            };
          });

          const uniqueEmails: string[] = uniq(userChatData.map(c => c.senderEmail))
      
          const allSenderUserExists = await this.em.find(User, {
            email: {$in: uniqueEmails}
          })

          console.log({uniqueEmails})

          if(allSenderUserExists.length !== uniqueEmails.length){
            throw new BadRequestException('One or more sender users does nopt exists')
          }


         const chatHistories =  userChatData.map(d=> {
          const senderUser = allSenderUserExists.find(u=> u.email === d.senderEmail)            
           this.em.persist(new ChatHistory(user, d.chatId, d.message, d.timestamp,senderUser, user, d.messageType, d.isRead ))
          
        })

        console.log(chatHistories)

         await this.em.flush()

        return {success: true}
    }
}
