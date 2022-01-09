 DROP TABLE IF EXISTS bronze_billionaire CASCADE;
 DROP TABLE IF EXISTS silver_billionaire CASCADE;
 DROP TABLE IF EXISTS source_of_wealth CASCADE;
 DROP TABLE IF EXISTS education_history CASCADE;
 DROP TABLE IF EXISTS news_metric CASCADE;
 DROP TABLE IF EXISTS news_article CASCADE;
 
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
	 					    city_of_residence VARCHAR(20),
						    state_of_residence VARCHAR(20),
	 	 					citizenship VARCHAR(50),
	 					    wealth_rank INTEGER,
	 						age INTEGER,
							relationship_status VARCHAR(50),
	 						children INTEGER,
	 						is_self_made BOOLEAN,
	 					    geometry VARCHAR(200),
	 					    longitude VARCHAR(200),
						    latitude VARCHAR(200)
						);	 
						
CREATE TABLE source_of_wealth (
				billionaire_id integer NOT NULL,
				wealth_source VARCHAR(500),
				FOREIGN KEY (billionaire_id) REFERENCES silver_billionaire(billionaire_id)
			);
			
CREATE TABLE education_history (
				billionaire_id integer NOT NULL,
				education VARCHAR(500),
				FOREIGN KEY (billionaire_id) REFERENCES silver_billionaire(billionaire_id)
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
				
select * from bronze_billionaire;
select * from silver_billionaire;
select * from news_article;
select * from news_metric;
select * from source_of_wealth;
select * from education_history;
select 'success' as status;