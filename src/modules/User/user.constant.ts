export type TProfilePictureUpdatePayload = {
  image: string;
};
export type TEditProfile = {
  image:string,
 firstName:string;
 lastName:string;
  phone:string;
  bio:string;
}

export type FeedbackReplyUpdate = {
  'feedback.reply.message'?: string;
  'feedback.reply.image'?: string;
  'feedback.reply.repliedAt'?: Date;
};