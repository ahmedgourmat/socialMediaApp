#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It overwrites the App.tsx file with a default content.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const appFilePath = path.join(root, 'App.tsx');

const appContent = `import { Text, View } from "react-native";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit App.tsx to modify this screen.</Text>
    </View>
  );
}
`;

// Overwrite the App.tsx file with the new content
fs.writeFile(appFilePath, appContent, (error) => {
  if (error) {
    return console.error(`Error creating App.tsx: ${error}`);
  }
  console.log('App.tsx reset successfully.');
});
