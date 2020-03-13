import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
// Styles
import * as S from './style';
// Components
import {ListItem} from 'react-native-elements';
import {User} from '../../../utils/interfaces';
import variables from '../../../styles/variables';

interface Props {
  data: User[];
  onLoadMore: () => void;
  isFetching: boolean;
  refreshing: boolean;
  isLoadMore: boolean;
  onClickItem: (user: User) => void;
  onRefresh: () => void;
}

const DynamicList: React.FC<Props> = (props: any) => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      props.isLoadMore ? (
        <ActivityIndicator
          color={variables.blue}
          size="large"
          style={{marginVertical: 15}}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => props.onLoadMore()}>
          <S.LoadMoreWrapper>
            <Text style={{fontWeight: '700', color: variables.white}}>
              Load More
            </Text>
          </S.LoadMoreWrapper>
        </TouchableOpacity>
      )
    );
  };

  return (
    <S.Container>
      {data && data.length > 0 && (
        <FlatList
          style={{width: '100%'}}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => props.onClickItem(item)}>
              <ListItem
                leftAvatar={{source: {uri: item.avatar_url}}}
                title={item.login}
                bottomDivider
                chevron={{color: variables.indigo}}
              />
            </TouchableOpacity>
          )}
          ListFooterComponent={renderFooter}
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      )}
    </S.Container>
  );
};

export default DynamicList;
