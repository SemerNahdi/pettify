import autobind from "autobind-decorator";
import * as React from "react";
import {View, StyleSheet, SafeAreaView, StatusBar, Platform} from "react-native";
import Swiper from "react-native-swiper";
import Slide from "./Slide";
import Connect from "./Connect";
import Share from "./Share";
import {Button, Theme} from "../components";

export default class Walkthrough extends React.Component {

    onIndexChanged = (index: number) => {
        this.slides.filter((slide, i) => index !== i).forEach(slide => slide.hide());
        this.slides[index].show();
    }
    
    slides = [
        {
            title: "Review",
            description: "Access your pet's medical information and lab results to monitor their health.",
            icon: <Connect ref={ref => (this.Connect = ref)}/>,
            show: () => Connect.show,
            hide: () => Connect.hide
        },
        {
            title: "Share",
            description: "Share pictures of your adorable pet on your personalized profile page.",
            icon: <Share ref={ref => (this.Share = ref)}/>,
            show: () => Share.show,
            hide: () => Share.hide
        }
    ];

    home() {
        this.props.navigation.navigate("Home");
    }

    @autobind
    renderPagination(index: number, total: number, context: Swiper): React.Node {
        const isFirst = index === 0;
        const isLast = index === total - 1;
        const back = () => context.scrollBy(-1);
        const next = () => (isLast ? this.home() : context.scrollBy(1));
        
        return (
            <SafeAreaView style={styles.footer}>
                <Button label="Back" onPress={back} white hidden={isFirst} style="primary" />
                <Button label={isLast ? "Start" : "Next"} onPress={next} white style="primary" />
            </SafeAreaView>
        );
    }

    render(): React.Node {
        const {renderPagination, onIndexChanged} = this;
        return (
            <Swiper loop={false} {...{ renderPagination, onIndexChanged }}>
                {
                    this.slides.map(slide => (
                        <View key={slide.title}>
                            <Slide {...slide} />
                        </View>
                    ))
                }
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: Theme.spacing.base
    }
});
