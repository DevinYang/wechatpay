function getAirDistance(distance,cabinLevel,singleOrNot){
			if(distance<=800){
				if(cabinLevel=="S"||cabinLevel=="W"){//经济
					if(singleOrNot==1){//单程
						return 8000;
					}else{	//来回程，有优惠
						return 14000/2;
					}
				}else if(cabinLevel=="J"){//公务
					if(singleOrNot==1){//单程
						return 11000;
					}else{
						return 19000/2;
					}
				}else if(cabinLevel=="P"){//头等
					if(singleOrNot==1){//单程
						return 14000;
					}else{
						return 24000/2;
					}
				}
			}else if(distance>800&&distance<=1200){
				if(cabinLevel=="S"||cabinLevel=="W"){
					if(singleOrNot==1){//单程
						return 11000;
					}else{
						return 20000/2;
					}
				}else if(cabinLevel=="J"){
					if(singleOrNot==1){//单程
						return 15000;
					}else{
						return 27000/2;
					}
				}else if(cabinLevel=="P"){
					if(singleOrNot==1){//单程
						return 18000;
					}else{
						return 28000/2;
					}
				}
				
			}else if(distance>1200&&distance<=1600){
				if(cabinLevel=="S"||cabinLevel=="W"){
					if(singleOrNot==1){//单程
						return 13000;
					}else{
						return 23000/2;
					}
				}else if(cabinLevel=="J"){
					if(singleOrNot==1){//单程
						return 18000;
					}else{
						return 33000/2;
					}
				}else if(cabinLevel=="P"){
					if(singleOrNot==1){//单程
						return 21000;
					}else{
						return 38000/2;
					}
				}
			}else if(distance>1600&&distance<=2000){
				if(cabinLevel=="S"||cabinLevel=="W"){
					if(singleOrNot==1){//单程
						return 15000;
					}else{
						return 26000/2;
					}
				}else if(cabinLevel=="J"){
					if(singleOrNot==1){//单程
						return 20000;
					}else{
						return 36000/2;
					}
				}else if(cabinLevel=="P"){
					if(singleOrNot==1){//单程
						return 23000;
					}else{
						return 40000/2;
					}
				}
			}else if(distance>2000&&distance<=3000){
				if(cabinLevel=="S"||cabinLevel=="W"){
					if(singleOrNot==1){//单程
						return 18000;
					}else{
						return 32000/2;
					}
				}else if(cabinLevel=="J"){
					if(singleOrNot==1){//单程
						return 24000;
					}else{
						return 43000/2;
					}
				}else if(cabinLevel=="P"){
					if(singleOrNot==1){//单程
						return 30000;
					}else{
						return 52000/2;
					}
				}
			}else{
				if(cabinLevel=="S"||cabinLevel=="W"){
					if(singleOrNot==1){//单程
						return 28000;
					}else{
						return 50000/2;
					}
				}else if(cabinLevel=="J"){
					if(singleOrNot==1){//单程
						return 38000;
					}else{
						return 68000/2;
					}
				}else if(cabinLevel=="P"){
					if(singleOrNot==1){//单程
						return 45000;
					}else{
						return 80000/2;
					}
				}
			}
		}
