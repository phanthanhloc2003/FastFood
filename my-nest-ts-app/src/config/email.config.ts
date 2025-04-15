import * as nodemailer from 'nodemailer';

export const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'locphankt92@gmail.com',
    pass: 'juvosxcetkyqacqh', 
  },
});