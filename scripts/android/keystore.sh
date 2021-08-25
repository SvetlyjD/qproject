. ./.env
cd android/app
keytool -genkeypair -v -keystore $PROJECTNAME.keystore -alias $PROJECTNAME -keyalg RSA -keysize 2048 -validity 10000