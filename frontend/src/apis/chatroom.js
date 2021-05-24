import axios from 'axios';

export async function getRoom(roomID) {
  const { request } = await axios
    .get(`${process.env.ASR_API_DOMAIN}/api/chatroom/${roomID}`)
    .then((response) => response.data);
  return request;
}

export async function getAllRoom() {
  const { request } = await axios
    .get(`${process.env.ASR_API_DOMAIN}/api/chatroom`)
    .then((response) => response.data);
  return request;
}
