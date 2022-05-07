const apiConfig = {
   url: 'https://norma.nomoreparties.space/api/ingredients', //ссылка
   headers: {

   }

};

const parseResponse = (res: any) => {
   if (res.ok) {
      return res.json()
   } else {
      return Promise.reject(res.status)
   };
};

export { apiConfig, parseResponse };