 DROP TABLE IF EXISTS news_metric CASCADE;
 DROP TABLE IF EXISTS news_article CASCADE;
 DROP TABLE IF EXISTS bronze_billionaire CASCADE;
 DROP TABLE IF EXISTS silver_billionaire CASCADE;
 
 --The raw data as stored within the CSV for historical reference
 CREATE TABLE bronze_billionaire (
							name VARCHAR(50),
	 						net_worth DECIMAL,
	 					    country VARCHAR(100),
	 						source VARCHAR(100),
	 						rank INTEGER,
	 						age INTEGER,
	 						residence VARCHAR(50),
	 						citizenship VARCHAR(50),
	 	 					status VARCHAR(50),
	 						children INTEGER,
	 					    education VARCHAR(400),
	 						self_made BOOLEAN,
							geometry VARCHAR(200)
						);	 
	
 --The cleaned CSV data to be used as the source of truth for the project	
 CREATE TABLE silver_billionaire (
	 						billionaire_id INTEGER PRIMARY KEY,
							display_name VARCHAR(50) NOT NULL,
	 						first_name VARCHAR(20),
	 					    middle_name VARCHAR(20),
	 						last_name VARCHAR(20),
	 						suffix VARCHAR(10),
	 						net_worth DECIMAL,
	 						country VARCHAR(100),
	 						residence VARCHAR(50),
	 	 					citizenship VARCHAR(50),
	 						source_of_wealth VARCHAR(100),
	 					    wealth_rank INTEGER,
	 						age INTEGER,
							relationship_status VARCHAR(50),
	 						children INTEGER,
	 				        education VARCHAR(400),
	 						is_self_made BOOLEAN,
	 					    geometry VARCHAR(200),
	 					    longitude VARCHAR(200),
						    latitude VARCHAR(200)
						);	 
						
CREATE TABLE news_article (
				billionaire_id INTEGER,
				publication VARCHAR(500),
				author VARCHAR(500),
				title VARCHAR(500),
				url  VARCHAR(500),
				published_ts TIMESTAMP,
				popularity_rank INTEGER,
				FOREIGN KEY (billionaire_id) REFERENCES silver_billionaire(billionaire_id)
			);
			
CREATE TABLE news_metric (
				billionaire_id integer NOT NULL,
				total_article_count integer NOT NULL,
				FOREIGN KEY (billionaire_id) REFERENCES silver_billionaire(billionaire_id)
			);

select * from silver_billionaire;
select * from news_article;
select * from news_metric;
select 'success' as status;