import nodemailer from 'nodemailer';

/**
 * 이메일 주소를 통해 인증 주소를 보내는 함수
 * @param to 이메일을 보낼 주소
 * @param code 인증을 위한 주소
 */
export const sendMail = async (to: string, code: string) => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  // TODO email callback url 정하기
  const mailOption = {
    from: process.env.GOOGLE_EMAIL,
    to: to,
    subject: 'Hyupup에 당신을 초대합니다.',
    html: `
        <h1> Hyupup에 당신을 초대합니다. </h1>
        <p> 팀원과 함께 멋진 프로젝트를 완성해보세요! </p>
        <a href="${process.env.SERVER_URL}/api/email/verify/${code}"> 당신의 팀 대시보드로 가서 프로젝트를 함께 시작해세요. </a>
        `,
  };

  transport.sendMail(mailOption, async (err) => {
    if (err) throw Error(err.message);
  });
};
