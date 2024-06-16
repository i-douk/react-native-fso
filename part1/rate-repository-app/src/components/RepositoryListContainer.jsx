import { FlatList } from "react-native";
import RepositoryItem, { ItemSeparator } from "./RepositoryItem";

const RepositoryListContainer = ({repositories}) => {
  return (
    <FlatList
    data={repositories}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({ item }) => <RepositoryItem item={item} />}
    keyExtractor={(item) => item.id}
  />
  )
};

export default RepositoryListContainer;