import React, { Component , createRef} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Dimensions } from 'react-native';
import type { ScreenParams } from "../../components/Types";
import { NavHeader, RefreshIndicator } from "../../../components";
import PlayYouTube from "./PlayYouTube";

var height = Dimensions.get('window').height;

const API_KEY = "AIzaSyDRwHH_1BDlU_1_t_UJe2S2757JPTnLvfQ";

export default class TrainingScreen extends React.Component<ScreenParams<{ breed: String, species: String }>, SettingsState>{
    
    constructor(props){
        super(props);
        this.state = {
            videos: [
                {key:"0", videoId: "ozxwS8Rs0X4"}, 
                {key:"1", videoId: "ozxwS8Rs0X4"}, 
                {key:"2", videoId: "ozxwS8Rs0X4"},
                {key:"3", videoId: "ozxwS8Rs0X4"},
                {key:"4", videoId: "ozxwS8Rs0X4"}
            ],
            loading: true,
        }
    }

    async componentDidMount(): Promise<void> {
        const params = this.props.navigation.state.params;

        this.fetchYouTubeVideos(params.species + "+" + params.breed + "+training");
    }

    fetchYouTubeVideos = async (SEARCH_TERM) => {
        this.setState({videos: [{}]});
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${SEARCH_TERM}&key=${API_KEY}`)
        const json = await response.json();
        let videos = []
        let index = 0;
        json['items'].forEach(video => {
            let keyPair = {videoId: video.id.videoId, key: index++};
            videos.push(keyPair);
        });
        this.setState({ videos: videos, loading:false });
    };

    render()
    {
        const { navigation } = this.props;

        if(this.state.loading)
        {
            return(
            <View>
                <NavHeader title="Training Videos" back {...{navigation}}/>
                <SafeAreaView>
                    <View style={{
                        paddingTop: height/2,
                        justifyContent:"center",
                    }}>
                        <RefreshIndicator refreshing />
                    </View>
                </SafeAreaView>
            </View>
            )
        }
        return(
            <View>
                
                <NavHeader title="Training Videos" back backFn={() => this.props.navigation.goBack()} {...{navigation}}/>
                <SafeAreaView>
                    {/* <PlayYouTube videoId={this.state.videos[2].videoId}/> */}
                    <FlatList 
                        data={this.state.videos}
                        keyExtractor={(item, index) => item.key.toString()}
                        contentContainerStyle={{
                            padding: 10,
                            height: 1650,
                        }}
                        renderItem={({item, index}) => {
                            return <View 
                            style={{
                                padding: 20,
                                marginBottom: 20,
                                backgroundColor: "rgba(255,255,255,0.8)",
                                borderRadius: 16,
                                shadowColor: "black",
                                shadowOffset: {
                                    width:0,
                                    height: 10
                                },
                                shadowOpacity: .4,
                                shadowRadius: 20,
                            }}>
                                <PlayYouTube videoId={item.videoId}/>
                            </View>
                        }}
                    />
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
