import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title,children  }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleExpanded = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View className='border-2 border-secondary rounded-md mb-2 mt1 h-auto'>
      <TouchableOpacity onPress={toggleExpanded} className="flex-row justify-between p-3 bg-gray-700 w-full ">
        <Text className='text-ml font-semibold text-white'>{title}</Text>
        <Feather name={isCollapsed ? 'chevron-down' : 'chevron-up'} size={24} color="white" />
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed} align="center">
        <Animatable.View
          animation={isCollapsed ? undefined : 'fadeInDown'}
          duration={400}
          className='p-3 bg-gray-700 border-t border-white h-auto'
        >
            {children}
        </Animatable.View>
      </Collapsible>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f1f1f1',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
    backgroundColor: '#fff',
  },
});
