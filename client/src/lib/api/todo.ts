import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

interface Todo {
  id: number;
  status: boolean;
  name: string;
}

export const createTodo = async (name: string, userId: number) => {
  try {
    const result: { data: Todo } = await instance.post('/api/todo', {
      name: name,
      userId: userId,
    });
    // 추후 로그인된이메일 확인은 세션에서 (get요청이므로 데이터 없애야함)
    return result.data;
  } catch (e) {
    console.error('TODO 생성 실패');
    throw e;
  }
};
