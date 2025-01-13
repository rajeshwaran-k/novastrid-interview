import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class ChatHistory {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  createdBy: User;

  @Property()
  chatId!: string;

  @Property({ type: 'text' })
  message!: string;

  @Property()
  timestamp!: Date;

  @ManyToOne()
  sender: User;

  @ManyToOne()
  receiver!: User;

  @Property()
  messageType!: string;

  @Property({ default: false })
  isRead: boolean = false;

  constructor(
    createdBy: User,
    chatId: string,
    message: string,
    timestamp: Date,
    sender: User,
    receiver: User,
    messageType: string,
    isRead: boolean = false,
  ) {
    this.createdBy = createdBy;
    this.chatId = chatId;
    this.message = message;
    this.timestamp = timestamp;
    this.sender = sender;
    this.receiver = receiver;
    this.messageType = messageType;
    this.isRead = isRead;
  }
}
