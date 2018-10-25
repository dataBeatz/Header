
//PSQL query
/*
select 
  A.artistname, 
  A.verified, 
  A.followed ,
  A.bio,
  A.images,
  C.Locations,
  C.followersNumber
from artists as A
INNER JOIN locations as C 
on A.artistID = C.locationID
where A.artistID= 5;
*/
