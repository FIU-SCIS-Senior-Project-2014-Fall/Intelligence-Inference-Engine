var map;

var SimpleMap = function SimpleMap()
{
	this.map = new Object();
}
SimpleMap.prototype.get = function(key)
{
	return this.map[key];//may return null
}
SimpleMap.prototype.put = function(key, val)
{
	this.map[key] = val;
}