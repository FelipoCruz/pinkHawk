rsync -aP --exclude 'node_modules' ~/Desktop/CODEWORKS\ SENIOR/Thesis_Project/BANaNAS/BANaNAS/server/ root@urIpAddress:/root/apps &&

ssh -t root@urIpAddress << EOF
	pm2 stop 0 1 &&
	pm2 delete 0 1 &&
	./launch.sh
	bash -l
EOF