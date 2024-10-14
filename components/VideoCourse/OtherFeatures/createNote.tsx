import TextThemed from '@/components/Common/TextThemed';
import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import Button from '@/components/Common/Button/buttonIcon';
import { MessageCirclePlus } from 'lucide-react-native';
import { CreateNoteCourse } from '@/apis/userCourse';
import { useMutationHook } from '@/hooks';
interface Props {
  timeVideos: string;
  dataVideo: any;
  dataCourseDetail: any;
  setToast: (value: string) => void;
}
const MyEditor = ({ timeVideos, dataVideo, dataCourseDetail, setToast }: Props) => {
  const [valueText, setValueText] = useState('');
  const richText = useRef();

  const handleFontSizeChange = (size: any) => {
    richText.current?.insertHTML(`<span style="font-size:${size}px;">Your Text</span>`);
  };

  const handleFontTypeChange = (font: any) => {
    richText.current?.insertHTML(`<span style="font-family:${font};">Your Text</span>`);
  };

  const mutationCreateNote = useMutationHook(async (data) => {
    try {
      const res = CreateNoteCourse(data);
      return res;
    } catch (e) {
      console.error(e);
    }
  });

  const handlePostNote = () => {
    mutationCreateNote.mutate(
      {
        courseId: dataCourseDetail._id,
        videoId: dataVideo?._id,
        notes: {
          time: timeVideos,
          content: valueText,
        },
      },
      {
        onSuccess: (data) => {
          setToast('createNote');
          setValueText('')
        },
      }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View className="mb-5 flex-row items-center justify-between px-4">
        <View>
          <TextThemed type="subtitle" style={{ color: '#000' }}>
            Thêm ghi chú
          </TextThemed>
          <View className="items-center rounded-xl bg-red-600 px-3 py-2">
            <Text className="text-base text-white">{timeVideos}</Text>
          </View>
        </View>
        <Button
          color="#fff"
          size={24}
          SvgComponent={MessageCirclePlus}
          handlePress={handlePostNote}
        />
      </View>
      <RichToolbar
        editor={richText}
        actions={['bold', 'italic', 'underline', 'fontSize', 'fontFamily', 'insertImage']}
        iconMap={{
          fontSize: () => <Text style={{ fontSize: 18 }}>A</Text>,
          fontFamily: () => <Text style={{ fontFamily: 'serif' }}>F</Text>,
          insertImage: () => <Text>🖼</Text>,
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
        onChange={(text) => setValueText(text)}
      />
    </View>
  );
};

export default MyEditor;
