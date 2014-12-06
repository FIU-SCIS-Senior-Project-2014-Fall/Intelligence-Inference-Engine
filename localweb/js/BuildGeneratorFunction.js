var BuildGenerator = function(data, pref, type)
{
	var generator;
	if(type == QueryType.Select)
		generator = new SelectQueryGenerator();
	if(type == QueryType.Update)
		generator = new UpdateQueryGenerator();
	
	if(generator == null)
		throw "Invalid query type";
	console.log(data);
	console.log(pref);
	for(var i = 0;i < pref.length;i++)
	{
		var p = pref[i];
		console.log(p);
		if(p[0] == null || p[0] == "" || p[1] == null || p[1] == "")
			continue;
		var prefix = new Prefix(p[0], p[1]);
		generator.addPrefix(prefix);
	}

	for(var i = 0;i < data.length; i++)
	{
		var d = data[i];
		console.log(d);
		var subj;
		if(d[0] == null || d[0] == "")
			subj = new rdfObject();
		else
			subj = new rdfObject(d[0]);
		
		
		var pred;
		if(d[1] == null || d[1] == "" || d[2] == null || d[2] == "")
			pred = new Predicate();
		else
		{
			var prefix = generator.prefixes.get(d[1]);
			console.log(prefix);
			//console.log(generator);
			if(prefix != null)
			{
				pred = new Predicate(prefix, d[2]);
			}
		}
		
		
		
		var obj;
		if(d[3] == null || d[3] == "")
			obj = new rdfObject();
		else
			obj = new rdfObject(d[3]);
			
		
			
		if(subj == null || pred == null || obj == null)
			continue;
		var e = new Expression(subj, pred, obj);
		
		console.log(e);
		generator.addExpression(e);
		
		
	}
	
	return generator;
}