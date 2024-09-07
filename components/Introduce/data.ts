import {ImageProps} from 'react-native';

export interface OnboardingData {
  id: number;
  image: string;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    image: 'https://lottie.host/b3a52a41-213b-4311-99dc-89cdf2bf68c4/QBNhcc3toL.json',
    text: 'Xin chào bạn đã đến thế giời khóa học của chúng tôi',
    textColor: '#eaeaea',
    backgroundColor: '#2e2f3f',
  },
  {
    id: 2,
    image: 'https://lottie.host/0280eec9-1af5-49b2-b77f-b0afa98e8dfa/WKr3xNufp3.json',
    text: 'Rất nhiều khóa học lập trình thú vị đang chờ bạn',
    textColor: '#eaeaea',
    backgroundColor: '#fd94b2'
  },
  {
    id: 3,
    image: 'https://lottie.host/40d7cb84-4eec-41c6-8114-822b546e895f/iVgS117VDO.json',
    text: 'Hãy tham gia ngay',
    textColor: '#f8dac2',
    backgroundColor: '#154f40',
  },
];

export default data;