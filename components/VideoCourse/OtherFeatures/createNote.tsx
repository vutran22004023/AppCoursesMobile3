import TextThemed from '@/components/Common/TextThemed';
import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import Button from '@/components/Common/Button/buttonIcon'
import { MessageCirclePlus } from 'lucide-react-native';
interface Props {
  timeVideos: string;
}
const MyEditor = ({timeVideos}: Props) => {
  const [valueText, setValueText] = useState("");
  const richText = useRef();

  const handleFontSizeChange = (size) => {
    richText.current?.insertHTML(`<span style="font-size:${size}px;">Your Text</span>`);
  };

  const handleFontTypeChange = (font) => {
    richText.current?.insertHTML(`<span style="font-family:${font};">Your Text</span>`);
  };

  return (
    <View style={{ flex: 1 }}>
      <View className="flex-row justify-between mb-5 items-center px-4">
        <View>
          <TextThemed type="subtitle" style={{color: "#000"}}>Thêm ghi chú</TextThemed>
          <View className='px-3 py-2 bg-red-600 rounded-xl items-center'>
            <Text className='text-white text-base'>{timeVideos}</Text>
          </View>
        </View>
        <Button color="#fff" size={24}  SvgComponent={MessageCirclePlus} />
      </View>
      <RichToolbar
        editor={richText}
        actions={[
          'bold', 'italic', 'underline',
          'fontSize', 'fontFamily', 'insertImage'
        ]}
        iconMap={{
          fontSize: () => <Text style={{ fontSize: 18 }}>A</Text>,
          fontFamily: () => <Text style={{ fontFamily: 'serif' }}>F</Text>,
          insertImage: () => <Text>🖼</Text>
        }}
        onPressAddImage={() => {
          richText.current?.insertImage('https://example.com/your-image.jpg');
        }}
        onPress={(action) => {
          switch (action) {
            case 'fontSize':
              handleFontSizeChange(18); // Example: setting font size to 18px
              break;
            case 'fontFamily':
              handleFontTypeChange('Arial'); // Example: setting font type to Arial
              break;
            case 'insertImage':
              // Custom image handling can go here
              break;
            default:
              return;
          }
        }}
      
      />
      <RichEditor
        ref={richText}
        placeholder="Thêm ghi chú vào đây"
        onChange={text => setValueText(text)}
      />
    </View>
  );
};

export default MyEditor;
