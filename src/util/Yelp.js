const clientId = 'c54UyG79obYJNygoisEaeA';
const secret = 'QCRnSPElwi1JIb6YTzjcvof7HGtTqhx0sgyjXpHlYpeYr814s9Zakahb72tz3neL';
const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`;


let accessToken;

const Yelp = {
    // 從API取得access token
    getAccessToken(){
        if(accessToken){
            return new Promise((resolve)=>resolve(accessToken));
        }
        return fetch(url,{method:'POST'})
                .then(response=>response.json())
                .then(jsonResponse=>{
                    accessToken=jsonResponse.access_token;
                    return accessToken;
                });
    },
    search(term,location,sortBy){
        return Yelp.getAccessToken().then((accessToken)=>{
            return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`
                    ,{headers:{Authorization:`Bearer ${accessToken}`}})
                    .then(response=>response.json())
                    .then(jsonResponse=>{
                        if(jsonResponse.businesses){
                            return jsonResponse.businesses.map(business=>{
                                return {
                                    id:business.id,
                                    imageSrc:business.image_url,
                                    name:business.name,
                                    address:business.location.address1+business.location.address2+business.location.address3,
                                    city:business.location.city,
                                    state:business.location.state,
                                    zipCode:business.location.zip_code,
                                    category:business.categories[0].title,
                                    rating:business.rating,
                                    reviewCount:business.review_count
                                };
                            });
                        }
                    });
        })
    }
};


export default Yelp;