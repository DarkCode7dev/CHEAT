select distinct A.[name] from sysobjects as A inner join syscomments as B on A.id=B.id where B.text like '%PROB_TYPE%'
