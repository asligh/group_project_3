 DROP TABLE IF EXISTS bronze_billionaire CASCADE;
 DROP TABLE IF EXISTS silver_billionaire CASCADE;
 
 CREATE TABLE bronze_billionaire (
							"Name" VARCHAR(50),
	 						"NetWorth" DECIMAL,
	 					    "Country" VARCHAR(100),
	 						"Source" VARCHAR(100),
	 						"Rank" INTEGER,
	 						"Age" INTEGER,
	 						"Residence" VARCHAR(50),
	 						"Citizenship" VARCHAR(50),
	 	 					"Status" VARCHAR(50),
	 						"Children" INTEGER,
	 					    "Education" VARCHAR(400),
	 						"Self_made" BOOLEAN,
							"geometry" VARCHAR(200)
						);	 
						
 CREATE TABLE silver_billionaire (
	 						ID SERIAL PRIMARY KEY,
							"Display_Name" VARCHAR(50),
	 						"First_Name" VARCHAR(20),
	 					    "Middle_Name" VARCHAR(20),
	 						"Last_Name" VARCHAR(20),
	 						"Suffix" VARCHAR(10),
	 						"Net_Worth" DECIMAL,
	 						"Country" VARCHAR(100),
	 						"Residence" VARCHAR(50),
	 	 					"Citizenship" VARCHAR(50),
	 						"Source_Of_Wealth" VARCHAR(100),
	 					    "Wealth_Rank" INTEGER,
	 						"Age" INTEGER,
							"Relationship_Status" VARCHAR(50),
	 						"Children" INTEGER,
	 				        "Education" VARCHAR(400),
	 						"Is_Self_Made" BOOLEAN,
	 					    "Geometry" VARCHAR(200),
	 					    "Longitude" VARCHAR(200),
						    "Latitude" VARCHAR(200)
						);	 