select "Name", COUNT(*) as "x"
from bronze_billionaire
group by "Name"
having COUNT(*) > 1