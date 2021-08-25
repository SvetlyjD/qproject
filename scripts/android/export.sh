. ./.env
cd android
./gradlew assembleRelease
cp ./app/build/outputs/apk/release/app-release.apk ../download/$PROJECTNAME.apk