// module.exports = () => {
//   const data = { users: [] }
//   // Create 1000 users
//   for (let i = 1; i <= 100; i++) {
//     data.users.push({ id: i, name: `user${i}` })
//   }
//   return data
// }
// 
var Mock=require('mockjs');
let Random=Mock.Random;

module.exports = () => {
	const data = { news: [] }

	let images=[1,2,3].map(x=>Random.image('120x60',Random.color(),Random.word(3,8)));
	for(let i=0;i<100;i++){
        let content=Random.cparagraph(0,10);
 
        data.news.push({
             id:i,
             title:Random.cword(8,20),
             desc:content.substr(6,40),
             tag:Random.cword(2,6),
             views:Random.integer(100,5000),
             images:images.slice(0,Random.integer(1,3))
        })
    }

	return data;
}