. ./.env
cd ios
xcodebuild -workspace $PROJECTNAME.xcworkspace clean archive -scheme $PROJECTNAME -configuration Release -archivePath ../tmp/ios/$PROJECTNAME.xcarchive