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
						
SELECT "Name" FROM bronze_billionaire; 	
						
 CREATE TABLE silver_billionaire (
							DISPLAY_NAME VARCHAR(50) PRIMARY KEY,
	 						FIRST_NAME VARCHAR(20),
	 					    MIDDLE_NAME VARCHAR(20),
	 						LAST_NAME VARCHAR(20),
	 						SUFFIX VARCHAR(10),
	 						NET_WORTH DECIMAL,
	 						COUNTRY VARCHAR(20),
	 						RESIDENCE VARCHAR(30),
	 	 					CITIZENSHIP VARCHAR(30),
	 						SOURCE_OF_WEALTH VARCHAR(30),
	 					    WEALTH_RANK INTEGER
	 						AGE INTEGER
							RELATIONSHIP_STATUS VARCHAR(30),
	 						CHILDREN INTEGER,
	 				        EDUCATION VARCHAR(100),
	 						IS_SELF_MADE BOOLEAN,
	 					    GEOMETRY POINT,
	 					    LONGITUDE VARCHAR(200),
						    LATITUDE VARCHAR(200)
						);	 
 