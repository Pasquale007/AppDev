import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants/theme';
import { Entypo } from '@expo/vector-icons';

export default function DropDown({ data, title, icon, onSelect }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [filteredData, setFilteredData] = useState(data);
    const [searchText, setSearchText] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const handleToggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    React.useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleSelectItem = (item) => {
        console.log(item)
        onSelect(item)
        const index = selectedItems.findIndex((selectedItem) => selectedItem.iata === item.iata);
        if (index > -1) {
            const newSelectedItems = [...selectedItems];
            newSelectedItems.splice(index, 1);
            setSelectedItems(newSelectedItems);
            setSelectedItem(null);
        } else {
            setSelectedItems([item]);
            setSelectedItem(item);
        }
        handleToggleModal();
    };

    const handleFilter = (text) => {
        setSearchText(text);
        const newData = data.filter((item) => {
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        setFilteredData(newData);
    };

    const renderListItem = ({ item }) => {
        const isSelected = selectedItems.some((selectedItem) => selectedItem.iata === item.iata);

        return (
            <TouchableOpacity
                testID={`item-${item.iata}`}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 8,
                    backgroundColor: isSelected ? COLORS.cardColor : COLORS.background,
                }}
                onPress={() => handleSelectItem(item)}>
                <Text style={{ flex: 1, color: isSelected ? COLORS.textWhite : COLORS.textWhite, fontFamily: FONT.medium, fontSize: SIZES.medium }}>{item.name}</Text>
                {isSelected && <Text style={{ color: COLORS.textWhite }}>✓</Text>}
            </TouchableOpacity>
        );
    };

    return (
        <TouchableOpacity testID='touchable'
            style={{
                backgroundColor: COLORS.searchFieldColor,
                borderRadius: 10,
                padding: 2,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: "5%",

            }} onPress={handleToggleModal}>
            <Entypo name={icon} size={30} color={COLORS.background} style={{ marginRight: 8 }} />
            <View>
                <Text>{title}</Text>
                <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.medium, color: COLORS.textBlack }}>{selectedItem ? selectedItem.name : 'Select item'}</Text>
            </View>
            <Modal visible={isModalVisible} animationType="slide" testID='modal'>
                <View style={{ flex: 1, backgroundColor: COLORS.background }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                        <TextInput
                            testID='search-input'
                            placeholder="Search"
                            value={searchText}
                            onChangeText={handleFilter}
                            style={{ flex: 1, borderWidth: 1, borderRadius: 8, padding: 8, margin: 8, backgroundColor: COLORS.searchFieldColor, color: COLORS.textBlack, fontFamily: FONT.medium, fontSize: SIZES.medium }}
                        />
                        <TouchableOpacity onPress={handleToggleModal} style={{ padding: 8 }}>
                            <Text style={{ color: COLORS.navIconActive, fontFamily: FONT.medium, fontSize: SIZES.medium }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList data={filteredData} renderItem={renderListItem} keyExtractor={(item) => item.iata} />
                </View>
            </Modal>
        </TouchableOpacity>
    );
}
