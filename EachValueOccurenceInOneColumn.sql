Select Age, Count(Age) AS Frequency
From Person --person is table name
Group By Age --age is column on calculations happens 
Order By
Count(Age) Desc
