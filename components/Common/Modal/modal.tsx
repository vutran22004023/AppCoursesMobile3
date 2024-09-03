// ModalComponent.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import {icons} from '@/constants'
interface ModalComponentProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  titleSmail?: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isVisible, onClose, children, title,titleSmail }) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropColor="rgba(0, 0, 0, 0.5)"
      backdropOpacity={0.7}
    >
      <View style={styles.modalContent} className='bg-black-200'>
        <View className='flex-row justify-between'>
            <View></View>
        <TouchableOpacity onPress={onClose} className=''>
            <Image source={icons.close} style={{tintColor: '#fff'}} className='w-5 h-5'/>
        </TouchableOpacity>
        </View>
        <View className='mb-2'>
        {title && <Text style={styles.title}>{title}</Text>}
        {titleSmail && <Text style={styles.titleSmail}>{titleSmail}</Text>}
        </View>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    borderRadius: 10,
    padding: 10,
    width: '99%',
  } as ViewStyle,
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  } as TextStyle,
  titleSmail: {
    fontSize: 12,
    color: '#fff',
  } as TextStyle,
});

export default ModalComponent;
