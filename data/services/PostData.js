export default function PostData(type, userData) {
    let BaseURL = 'https://sahimedia.in/hc/api/user_login.php/';
    //let BaseURL = 'http://localhost/PHP-Slim-Restful/api/';
    return new Promise((resolve, reject) =>{
    fetch(BaseURL+type, {
   method: 'POST',
   body: JSON.stringify(userData)
   })
   .then((response) => response.json())
   .then((res) => {
    resolve(res);
   })
   .catch((error) => {
    reject(error);
   });
   });
   }
   
//   PostData("", [{email: "", password: ""}])
//   .then(result => console.log(result))