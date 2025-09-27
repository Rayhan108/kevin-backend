export type TProfilePictureUpdatePayload = {
  image: string;
};
export type TEditProfile = {
  image: string;
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
};
// export type TEditContractorProfile = {
//   image?: string;
//   firstName?: string;
//   lastName?: string;
//   phone?: string;
//   bio?: string;
//   profileVedio: [{ thumbImageUrl: string; title: string; videoUrl: string }];
// };
export type TEditContractorProfile = [{
 
  profileVedio: { thumbImageUrl: string; title: string;videoUrl: string };
}];
export type FeedbackReplyUpdate = {
  'feedback.reply.message'?: string;
  'feedback.reply.image'?: string;
  'feedback.reply.repliedAt'?: Date;
};
