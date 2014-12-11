var map;

var SimpleMap = function SimpleMap()
{
	this.map = new Object();
}
//Description : Acts like a java hashmap.get function
//Input : a string that represents the key of some value
//Output : the value for the specified key
//Pre-Condition : the key exists in the map
//Post-Condition : the value is the most current for the key supplied
SimpleMap.prototype.get = function(key)
{
	return this.map[key];//may return null
}
//Description : Acts like a java hashmap.put function
//Input : a string to represent a key and a string that is the value for the key
//Output : N/A
//Pre-Condition : the key and val values are not null 
//Post-Condition : the key and value are added to the map
SimpleMap.prototype.put = function(key, val)
{
	this.map[key] = val;
}
//Description : returns the internal data structure of the map
//Input : N/A
//Output : Internal array used to store the map
//Pre-Condition : N/A
//Post-Condition : N/A
SimpleMap.prototype.getAll = function()
{
	return this.map;
}