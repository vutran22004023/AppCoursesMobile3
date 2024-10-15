import { ArrowDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface PickerItem {
  label: string;
  value: string;
}

interface MyPickerProps {
  items: PickerItem[];
  defaultValue: string;
  onValueChange: (value: string) => void;
}

const PickerSelect: React.FC<MyPickerProps> = ({ items, defaultValue, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => {}}>
      <RNPickerSelect
        value={selectedValue}
        onValueChange={(value) => {
          setSelectedValue(value);
          onValueChange(value);
        }}
        items={items}
        style={{
          inputIOS: styles.inputIOS,
          inputAndroid: styles.inputAndroid,
          iconContainer: {
            top: 5,
            right: 5,
          },
        }}
        useNativeAndroidPickerStyle={false}
        Icon={() => <ArrowDown size={16} color="gray" />}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fb923c',
    alignItems: 'center',
    padding: 5,
  },
  inputIOS: {
    fontSize: 12,
    color: 'black',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  inputAndroid: {
    fontSize: 12,
    color: 'black',
    borderRadius: 8,
    paddingRight: 30,
    backgroundColor: 'transparent',
  },
});

export default PickerSelect;