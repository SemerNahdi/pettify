// @flow
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

type VisibleState = { visible: boolean };

// eslint-disable-next-line react/no-multi-comp
export default class DiagnosticTool extends React.Component<VisibleState> {
    state = {
        visible: false,
        selectedItems: []
    };
    
    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
    }

    hide() {
        this.setState({ visible: false });
    }

    show() {
        this.setState({ visible: true });
    }

    render(): React.Node {
        const {visible, selectedItems} = this.state;
        if (!visible) {
            return <View />;
        }

        return (
            <View style={styles.container}>
                <SectionedMultiSelect
                    IconRenderer={MaterialIcons}
                    items={items}
                    uniqueKey="name"
                    subKey="children"
                    iconKey="icon"
                    selectText="Choose some things..."
                    showDropDowns={true}
                    readOnlyHeadings={false}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={selectedItems}
                />
            </View>
          );
    }
}

const items = [
  {
    name: 'Dog',
    id: 0,
    // icon: 'dog',
    children: [
        { name: "Cough" },
        { name: "Lethargy" },
        { name: "Decreased appetite" },
        { name: "Intense breathing" },
        { name: "Eye redness" },
        { name: "Runny nose" },
        { name: "Diarrhea" },
        { name: "Vomiting" },
        { name: "Depression" },
        { name: "Abdominal pain" },
        { name: "Sneezing" },
        { name: "Discoloration of the gums" },
        { name: "Lack of energy" },
        { name: "Muscular pain" },
        { name: "Blood in the urine" },
        { name: "Severe itching" },
        { name: "Paralysis" },
        { name: "Fallen jaw" },
        { name: "Wounds in the mouth" },
        { name: "Lack of coordination" },
        { name: "High temperature" },
        { name: "Inability to swallow" },
        { name: "Shyness or aggression" },
        { name: "Frequent changes in behavior" },
        { name: "Dermatitis" },
        { name: "Existence of an external agent on the skin" }
    ],
  },
  {
    name: 'Cat',
    id: 1,
    // icon: 'cat',
    children: [
        { name: "Struggle and discomfort when urinating" },
        { name: "Presence of blood in the urine" },
        { name: "Urination in unusual places" },
        { name: "Crying when urinating" },
        { name: "Licking the urinary tract (usually due to pain)" },
        { name: "Depression" },
        { name: "Anorexia" },
        { name: "Vomiting" },
        { name: "Dehydration" },
        { name: "Freckles on cat skin" },
        { name: "Persistent itching of the body" },
        { name: "Permanent body licking" },
        { name: "Redness and irritation of the skin" },
        { name: "Hair loss" },
        { name: "Skin infections and inflamed red spots on the skin" },
        { name: "Decreased appetite" },
        { name: "Lethargy" },
        { name: "Discharge from the eyes" },
        { name: "Nasal discharge" },
        { name: "Wounds around the mouth, soft palate, nose tip, lips, or around the paws" },
        { name: "Pneumonia (lung infection)" },
        { name: "Difficulty breathing" },
        { name: "Infection" },
        { name: "Arthritis (inflammation of the joints)" },
        { name: "Walking with pain" },
        { name: "High fever" },
        { name: "Very severe gastrointestinal symptoms" },
        { name: "Bloody vomiting" },
        { name: "Bloody diarrhea" },
        { name: "Sneezing" },
        { name: "Serious to purulent mucus from the nose and eyes" },
        { name: "Conjunctivitis" },
        { name: "Conjunctival chemosis" }
    ],
  },
  {
    name: 'Bird',
    id: 2,
    // icon: 'dove',
    children: [
        { name: "Increased urination (polyuria)" },
        { name: "Loose diarrhea and watery stools" },
        { name: "Blood in the stool" },
        { name: "Green diarrhea" },
        { name: "Depression" },
        { name: "Torticoline (twisting of the head and neck)" },
        { name: "Ataxia (loss of balance)" },
        { name: "Paralysis of limbs and wings" },
        { name: "Decreased appetite" },
        { name: "Difficulty eating" },
        { name: "Respiratory problems such as wheezing" },
        { name: "Decreased egg production" },
        { name: "Egg abnormality (egg size, shape and color)" },
        { name: "Eye discharge" },
        { name: "Nasal discharge" },
        { name: "Discharge from the beak" },
        { name: "Weakness" },
        { name: "Anorexia" },
        { name: "Drowsiness" },
        { name: "Dirty feathers and dangling wings" },
        { name: "Swelling of the soles of the feet and joints" },
        { name: "Blindness" }
    ],
  },
];

const styles = StyleSheet.create({
    container: {
        width: '100%',
    }
});
