add Geo json data to find the locations near the user(This can be fetched while the user log in to the site)
add a mechanism to fetch the users location(will use mongoose to sort the facilities based on the location and will sort them based on the distance and ther
will also be a threshold distanne let's say 169km)
fetch all the nearby facilities if user allows you to
in the main page of the facility add the facility to add comments(the uswe will be able to give reviews)
and display previous comments as well and in the side display the
near facilites of same type

This is the approach we can follow for getting the neqby facilities:

1)Search the entire database for the facilities(A threshold distance will be given all the facilities in the database
within this distance will be returned).This approach is good if it is followed by sharding in this case
we can redirect the user to the local database which will only contain the facilities for that local area
.This approach is good bu this needs to be implemented with sharding,and since this is a test project threefore nothing
going with this approach.

2)We can assign certain landmarks and then calculate the nearest landmark associated with the user and then
return the facilities associated with this landmark this is a kind of indexing and therfore our write operation
will take more time but since this approach has more read then write therefore our priority should be read and not
write.

IN this project since I don't have much time to spare therefore adding data from three locations:
Kotdwara
Haldwani
Mysuru
Therefore adding three landamarks coressponding to these locations:
1)Kotdwara=>JhandaChowk
2)Haldwani=>Bawarchi
3)Mysuru=>NIE


This is the final step before prdouction we need to add elastic search to enable full text search and add a search results page as well and build upon the UI for the pages.

way1)We will add text index build upon this else we need to integrat elastic search