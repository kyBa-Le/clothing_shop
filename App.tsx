import { Text } from "react-native";
import { getDbConnection } from "./src/database/dbService";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    const initDb = async () => {
      const db = await getDbConnection();
      await db.executeSql('DROP TABLE IF EXISTS products;');
      await db.executeSql('DROP TABLE IF EXISTS categories;');
    }
    initDb();
  }, []);

  return (
    <Text>
      KHI BẠN THẤY MÀN HÌNH NÀY TỨC LÀ TOÀN BỘ DATABASE ĐÃ ĐƯỢC RESET
    </Text>
  );
}

export default App;
