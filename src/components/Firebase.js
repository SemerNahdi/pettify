// @flow
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import { Theme } from "./Theme";

const config = {
    apiKey: "AIzaSyBFDl3OfOqj8lU9vN4ygmDYBD7XJG_xO1I",
    authDomain: "pettify-af8a3.firebaseapp.com",
    projectId: "pettify-af8a3",
    storageBucket: "pettify-af8a3.firebasestorage.app",
    messagingSenderId: "656499741407",
    appId: "1:656499741407:android:2fe5ec4c5f65f25dcdcf6a",
    measurementId: "9892994799",
};


export default class Firebase {
    
    static config: config;
    static firestore: firebase.firestore.Firestore;
    static auth: firebase.auth.Auth;
    static storage: firebase.storage.Storage;

    static async init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
        Firebase.firestore = firebase.firestore();
        Firebase.storage = firebase.storage();
        Firebase.config = config;
 /*
        //Start of default admin creation
        try{
            var adminCreation = firebase.initializeApp(config, "ADMIN");
            var adminUid;
    
            await adminCreation.auth().createUserWithEmailAndPassword("ad@min.com","temp123").then(
                (admin) => { adminUid = admin.user.uid; }
            );

            await adminCreation.firestore().collection("users").doc(adminUid).set({
                name: "admin",
                email: "ad@min.com",
                role: "a",
                pic: Theme.links.defaultProfile
            });
    
            await adminCreation.auth().signOut();
            await adminCreation.delete();
        
        } catch (e) {
            setTimeout(function(){
                alert("This warning is coming from src/components/Firbase.js and needs to be commented out, first time data injection is already complete")
            }, 1000);
        }
        //End of default admin creation

        //Start of diseases data injection
        Firebase.firestore.collection("diseases").doc("Air sac mites").set({
            symptoms: [
                "Dirty feathers and dangling wings",
                "Discharge from the beak",
                "Nasal discharge",
                "Respiratory problems such as wheezing",
                "Weakness",
            ]
        }) 
        Firebase.firestore.collection("diseases").doc("Canine Distemper").set({
            symptoms: [
                "Anorexia",
                "Clear nasal discharge",
                "Coughing",
                "Diarrhea",
                "Fever",
                "Inflammation of the brain and spinal cord",
                "Lethargy",
                "Purulent eye discharge",
                "Pustular dermatitis (rarely)",
                "Vomiting",
            ]
        })
        Firebase.firestore.collection("diseases").doc("Dog Hepatitis").set({
            symptoms: [
                "Coughing",
                "Decreased appetite",
                "Depression",
                "Discoloration of the gums",
                "High temperature",
                "Stomach ache",
                "Vomiting",
            ]
        })
        Firebase.firestore.collection("diseases").doc("Existence of external agent").set({
            symptoms: [
                "Freckles on cat skin (fleas appear as small black dots on the skin)",
                "Hair loss",
                "Permanent body licking",
                "Persistent itching of the body",
                "Redness and irritation of the skin",
                "Skin infections and inflamed red spots on the skin"
            ]
        })
        Firebase.firestore.collection("diseases").doc("FHV-1").set({
            symptoms: [
                "Anorexia",
                "Chemosis",
                "Conjunctival",
                "Conjunctivitis",
                "Dehydration",
                "Serous to purulent mucus from the nose and eyes",
                "Sneezing"
            ]
        })
        Firebase.firestore.collection("diseases").doc("Fatty liver disease").set({
           symptoms: [
               "Anorexia",
               "Ataxia (loss of balance)",
               "Depression",
               "Dirty feathers and dangling wings",
               "Drowsiness",
               "Green diarrhea",
               "Loose diarrhea and watery stools",
               "Respiratory problems such as wheezing"
           ]
       }) 
        Firebase.firestore.collection("diseases").doc("Feline Calicivirus Infection").set({
            symptoms: [
                "Decreased appetite",
                "Difficulty breathing",
                "Discharge from the eyes",
                "Fever",
                "Infection Arthritis (inflammation of the joints)",
                "Lethargy",
                "Nasal discharge",
                "Pneumonia (lung infection)",
                "Walking with pain",
                "Wounds around the cat's mouth, soft palate, nose tip, lips or around the paws"
            ]
        })
        Firebase.firestore.collection("diseases").doc("Feline Urinary Tract (FLUTD)").set({
            symptoms: [
                "Anorexia",
                "Crying when urinating",
                "Dehydration",
                "Depression",
                "Licking the urinary tract (usually due to pain in this area)",
                "Struggle and discomfort when urinating",
                "The presence of blood in the urine",
                "Urination in unusual places",
                "Vomiting"
            ]
        })
        Firebase.firestore.collection("diseases").doc("Feline panleukopenia").set({
            symptoms: [
                "Anorexia",
                "Bloody diarrhea",
                "Bloody vomiting",
                "Depression",
                "High fever",
                "Lethargy",
                "Very severe gastrointestinal symptoms"
            ]
        })
        Firebase.firestore.collection("diseases").doc("Gout").set({
            symptoms: [
                "Ataxia (loss of balance)",
                "Depression",
                "Dirty feathers and dangling wings",
                "Green diarrhea",
                "Increased urination (polyuria)",
                "Loose diarrhea and watery stools",
                "Swelling of the soles of the feet and joints"
            ]
        }) 
        Firebase.firestore.collection("diseases").doc("Leptospirosis").set({
            symptoms: [
                "Blood in the urine",
                "Decreased appetite",
                "Depression",
                "Diarrhea",
                "High temperature",
                "Lethargy",
                "Muscular pain",
                "Vomiting"
            ]
        })
        Firebase.firestore.collection("diseases").doc("Para-flu dog").set({
            symptoms: [
                "Clear nasal discharge",
                "Coughing",
                "Decreased appetite",
                "Fever",
                "Lethargy",
                "Respiratory problems",
                "Sneezing"
            ]
        })
        Firebase.firestore.collection("diseases").doc("Psittacosis").set({
            symptoms: [
                "Difficulty eating",
                "Eye discharge",
                "Green diarrhea",
                "Nasal discharge",
                "Paralysis of limbs and wings",
                "Respiratory problems such as wheezing"
            ]
        })
        Firebase.firestore.collection("diseases").doc("Rabies").set({
            symptoms: [
                "Convulsions",
                "Fallen jaw",
                "Frequent changes in behavior",
                "High temperature",
                "Inability to swallow",
                "Lack of coordination",
                "Paralysis",
                "Shyness or aggression",
                "Wounds in the mouth"
            ]
        })
        //End of diseases data injection

        //Start of diseaseDetails data injection 
        Firebase.firestore.collection("diseaseDetails").doc("Air sac mites").set({
            description: [
                "One pathogen that can infect birds is sternostoma tracheacolum, the air sac mite. The mites live in and lay their eggs in a bird's respiratory system, before leaving through the nasal cavity to find a new host. Mild cases may be asymptomatic, but the mites are very contagious, and they can be deadly if not caught."
            ],
            prevention: [
                "Like mosquitos, the air sac mites breed most effectively when in hot, humid weather and near standing water. Therefore, keep your birds in a cool environment that is not too humid, and make sure to clean up standing water immediately. Keep your birds away from wild or sick birds, and make sure their water is clean. If one of your birds is infected or came in contact with an infected bird, make sure to check all of your birds for mites, even if they are not showing symptoms."
            ],
            stageOne: [],
            stageTwo: [],
            symptoms: [
                "As the mites infect the bird's lungs and trachea, the most common symptoms are if your bird has difficulty breathing or produces a strange clicking noise. Another sign could be weak legs or wings. The mites may also cause unusual secretions from the beak or nasal cavity."
            ],
            treatments: [
                "The usual treatment for air sac mites is special insecticide. Make sure to only treat your bird according to your veterinarian's guidance. In addition to these treatments being toxic to the bird, the dosage is critical to ensure the mites are not killed too slowly or too quickly. An overly strong treatment could cause the mites to block your bird's trachea, causing suffocation. As your bird recuperates, make sure to sanitize its water and living environment daily, and try to keep your bird comfortable. Avoid letting your bird fly or exerting too much energy."
            ]
        })
        Firebase.firestore.collection("diseaseDetails").doc("Canine Distemper").set({
            description: [
                "Canine distemper should sound familiar to you if your dog is up-to-date on his vaccinations. Veterinarians consider the distemper vaccine to be a core vaccination, along with the parvovirus, canine adenovirus, and rabies vaccines. ",
                "The disease is highly contagious and potentially lethal. A paramyxovirus causes distemper in dogs, and it is closely related to the measles and rinderpest viruses. It causes severe illness in the host by attacking multiple body systems, resulting in a widespread infection that is difficult to treat.",
            ],
            prevention: [
                "Make sure your puppy gets the full series of distemper vaccinations",
                "Keep distemper vaccinations up-to-date throughout your dog’s life and avoid any gaps in vaccinations",
                "Keep your dog away from infected animals and wildlife",
                "Vaccinate pet ferrets for distemper",
                "Be careful socializing your puppy or unvaccinated dog, especially in areas where dogs congregate, like dog parks, classes, and doggy day care",
                "By following these steps, you can keep your dog safe from distemper. If you have more questions about distemper in dogs, talk to your veterinarian, and call your vet immediately if you suspect your dog might be showing symptoms of distemper.",
            ],
            stageOne: [
                "The first symptom of distemper in dogs is usually watery to pus-like discharge from his eyes, followed by fever, loss of appetite, and clear nasal discharge. Most dogs develop a fever approximately 3-to-6 days after being infected, but the initial symptoms depend on the severity of the case and how the patient reacts to it. In general, the symptoms associated with distemper in dogs during the first stages of infection are:",
                "Fever",
                "Clear nasal discharge",
                "Purulent eye discharge",
                "Lethargy",
                "Anorexia",
                "Coughing",
                "Vomiting",
                "Diarrhea",
                "Pustular dermatitis (rarely)",
                "Inflammation of the brain and spinal cord",
                "If a dog infected with distemper survives the acute stage of the illness, he may also develop hyperkeratosis of the paw pads and nose, which gives distemper the nickname “hard pad disease.” This distemper symptom causes the pads of a dog’s feet to harden and enlarge and is uncomfortable.",
                "One of the other risks associated with distemper in dogs is a secondary bacterial infection that attacks when a dog’s immune system is compromised by the distemper virus. Secondary bacterial infections can cause respiratory and GI symptoms, including:",
                "Vomiting",
                "Diarrhea",
                "Difficulty breathing",
                "Change in respiratory rate",
                "Pneumonia",
            ],
            stageTwo: [
                "Some dogs develop neurological signs as the disease progresses and attacks the central nervous system. These signs are particularly disturbing for owners.",
                "Head tilt",
                "Circling",
                "Partial or full paralysis",
                "Seizures",
                "Nystagmus (repetitive eye movements)",
                "Muscle twitching",
                "Convulsions with increased salivation and chewing motions",
                "Death",
                "Distemper in dogs presents with some or all of these symptoms, depending on the severity of the case. According to the American Veterinary Medical Association (AVMA), “distemper is often fatal, and dogs that survive usually have permanent, irreparable nervous system damage.”",
            ],
            symptoms: [
                "Distemper dogs experience a wide range of symptoms depending on how advanced the disease is in their bodies. Once a dog becomes infected, the virus initially replicates in the lymphatic tissue of the respiratory tract before moving on to infect the rest of the dog’s lymphatic tissue, the respiratory tract, the GI tract, the urogenital epithelium, the central nervous system, and optic nerves. This results in two stages of symptoms.",
            ],
            treatments: [
                "There is no cure for canine distemper. Veterinarians diagnose distemper through a combination of clinical signs and diagnostic tests, or through a postmortem necropsy. Once diagnosed, care is purely supportive. Veterinarians treat the diarrhea, vomiting, and neurological symptoms, prevent dehydration, and try to prevent secondary infections. Most vets recommend that dogs be hospitalized and separated from other dogs to prevent the spread of infection.",
                "The survival rate and length of infection depend on the strain of the virus and on the strength of the dog’s immune system. Some cases resolve as quickly as 10 days. Other cases may exhibit neurological symptoms for weeks and even months afterward.",
            ]
        })
        Firebase.firestore.collection("diseaseDetails").doc("Dog Hepatitis").set({
            description: [
                "Infectious canine hepatitis is a highly contagious viral infection that affects the liver, kidneys, spleen, lungs, and the eyes of the affected dog. This disease of the liver is caused by a virus that is unrelated to the human form of hepatitis. Symptoms range from a slight fever and congestion of the mucous membranes to vomiting, jaundice, stomach enlargement, and pain around the liver.",
                "Many dogs can overcome the mild form of the disease, but the severe form can kill. There is no cure, but doctors can treat the symptoms.",
            ],
            prevention: [
                "The most widely used and important preventive measure for infectious canine hepatitis is a mandatory vaccine. Your dog will usually receive this in addition to his canine distemper vaccinations (most puppies should start their vaccinations between the ages of 6 and 8 weeks).",
                "Ask your veterinarian how frequently your dog should receive hepatitis vaccinations - it’s imperative that they get the right vaccines at the right age. They will likely need this specific vaccine at about 7 to 9 weeks of age, with the first booster between 11 and 13 weeks, after which they’ll be protected.",
                "To remain protected, they’ll need to keep up with booster injections throughout their life - with another at 15 months, then each year to prevent infection.",        
            ],
            stageOne: [],
            stageTwo: [],
            symptoms: [
                "Very young dogs have the highest mortality rate for canine hepatitis. Fever higher than 104°F (40°C) is the first sign to appear and lasts between 1 and 6 days, usually occurring in two stages. Your vet may notice a low white blood cell count along with short fever - one clue that your pup has become infected with the condition.",     
                "If the fever progresses past 1 day, your vet may take note of other symptoms as well, such as enlarged tonsils or inflamed eyes. There may also be serious, spontaneous bleeding due to insufficient clotting and faster heart rate.",
                "Though symptoms involving the central nervous system and respiratory system are not typical, brain damage can lead to seizures for severely infected dogs. Bleeding in the brain may also cause slight paralysis.",
                "Slight fever",
                "Deficiency of blood clotting",
                "Low white blood cell count",
                "Congestion of mucous membranes",
                "Severe reduction in white blood cells",
                "Apathy",
                "Thirst",
                "Loss of appetite",
                "Blindness",
                "Enlarged tonsils",
                "Eye inflammation",
                "Vomiting (occasional)",
                "Abdominal pain (occasional)",
                "Severe depression",
                "Watery discharge from eyes and nose",
                "Yellow, jaundiced look to skin, gums and ears",
                "Though the disease has become uncommon in areas where routine vaccinations are administered, owners must remain vigilant as the disease can develop and progress quickly in both puppies and dogs.",
            ],
            treatments: [
                "If you notice any symptoms listed above, contact your vet right away. Typically, sudden onset of the condition and bleeding point to canine hepatitis as the culprit. However, laboratory tests (including antibody tests, blood tests and immunofluorescence scanning) are needed to diagnose the disease. If severely ill, your dog may also need blood transfusions.",
                "Occasionally, chronic hepatitis in dogs is discovered via a routine blood health panel and the disease can be diagnosed before symptoms develop. Once your dog begins to display signs of liver disease, the condition has often progressed to a very late stage.",
                "Your vet can make a definitive diagnosis by taking a liver biopsy, which will determine the severity and type of liver disease. Depending on which results the biopsy reveals, your vet may recommend treating the disease with a broad-spectrum antibiotic, anti-inflammatory or immunosuppressive medication. ",
                "Sometimes, cornea clouding in the eye can be associated with painful spasms, and your vet may prescribe an eye ointment to alleviate pain. If your dog is experiencing clouding in the cornea, his eye should be protected from bright light.",
                "Treatment options can range from intravenous fluid therapy to hospitalization. Blood work will need to be taken on a regular basis and your pooch will need to be monitored.",
            ]
        })
        Firebase.firestore.collection("diseaseDetails").doc("Existence of external agent").set({
            description: [
                "One of the most common medical conditions affecting cats is allergy. An allergy occurs when the cat's immune system overreacts or is hypersensitive to foreign substances called allergens. Allergens are simply foreign proteins that the body's immune system tries to remove. Examples of allergens common in humans are pollens, dust, molds, and pet hair.",
                "Hypersensitivity in cats can manifest in one of three ways:",
                "The most common manifestation is itching of the skin, either localized to one area or a generalized reaction all over the cat's body.",
                "Another manifestation involves the respiratory system and may result in coughing, sneezing, and wheezing. Sometimes, there may be an associated nasal or ocular (eye) discharge.",
                "The third manifestation involves the digestive system and can result in vomiting, flatulence, and/or diarrhea.",
                "There are four common types of allergies in the cat: insect (fleas), food, inhalant (house dust, pollen and molds), and contact. Each of these has some common physical signs in cats, and each has some unique features.",
            ],
            prevention: [
                "Since the flea saliva causes the reaction, the most important treatment for flea allergy is to prevent fleabites. Most flea infestations occur in the warmer weather, but can occur year round. Strict flea control is the foundation of successful treatment.",
                "There are many highly effective flea control products, both for treating the cat and for controlling fleas in the environment. Modern monthly flea preventives have made it easier and less expensive than ever to prevent fleas from affecting your cat.",
                "Speak to your veterinarian about the best preventive for your cat.",
            ],
            stageOne: [],
            stageTwo: [],
            symptoms: [
                "In spite of common belief, a normal cat experiences only minor skin irritation in response to fleabites. Even in the presence of dozens of fleas, there will typically be very little itching. On the other hand, a cat with flea allergies has a severe reaction to even a single fleabite. This reaction is an allergic response to proteins or antigens present in the flea's saliva.",
                "When a flea bites a cat to consume a blood meal, some of its saliva is injected into the skin. In an allergic cat, just one bite can result in intense itching that can last for days. Cats with flea allergy dermatitis (FAD) do not have to be infested with fleas; a single flea is enough to cause a problem.",
                "A cat with FAD experiences intense itching and subsequently chews, licks, or scratches the affected site(s) nonstop. This causes hair loss and can lead to open sores or scabs on the skin, allowing a secondary bacterial infection to develop.",
                "The area most commonly involved in FAD is over the rump, just in front of the tail. Many flea-allergic cats chew or lick the hair off their legs. Itching and hair loss around the tail base, neck, and head should be considered suspicious for flea allergy dermatitis. In addition, an affected cat may have numerous, small scabs around the head and neck. These scabs are often referred to as miliary lesions, a term that was coined because the scabs look like millet seeds.",
            ],
            treatments: [
                "Clinical signs often give the first indication that your cat may suffer from FAD. Cats are such fastidious groomers that it is frequently impossible to find any evidence of fleas or flea dirt on the coat, especially if only one or two fleas are causing the problem. Intradermal allergy tests (skin tests similar to those performed in humans) or specialized blood tests (IgE tests) can confirm flea allergy in your cat.",
                "Some cats can be desensitized to the adverse effects of allergens through a series of special injections. However, flea allergy desensitization does not tend to be used for FAD in cats, as the success rate is extremely variable.",
                "Corticosteroids (cortisone or steroids) can be used to block the allergic reaction and give immediate relief to a cat suffering from the intense itching of FAD. This is often a necessary part of treating flea allergy dermatitis, especially during the initial stages. Some cats respond best to long-acting injections (e.g., glucocorticoids, brand name Depo-medrol®) and others to oral medication (e.g., prednisone).",
                "While it is true that cats are more resistant to the negative side effects of steroids than humans and dogs, significant side effects of steroids can occur if not used properly. For this reason, the goal is to administer the smallest amount of steroid needed to keep the cat comfortable.",
                "For some patients, combining corticosteroids with antihistamines and/or omega-fatty acid supplements will provide the ideal form of relief. If your cat develops a secondary bacterial skin infection (pyoderma) because of the scratching, antibiotics may also be necessary. Occasionally topical treatments with shampoos and sprays may be considered.",
            ]
        })
        Firebase.firestore.collection("diseaseDetails").doc("FHV-1").set({
            description: [
                "Conjunctivitis is the medical term used to describe inflammation of the tissues surrounding the eye. These tissues include the lining of the eyelids and the third eyelid, as well as the tissues covering the front part of the eye or globe. Conjunctivitis may be a primary condition or may be secondary to an underlying systemic or ocular (eye) disease.",
                "Feline herpesvirus conjunctivitis a form of primary conjunctivitis caused by the highly infectious feline herpesvirus (FHV-1). Herpesvirus infection is the most common cause of conjunctivitis in cats. In most cases, herpesvirus conjunctivitis is self-limiting and will resolve within two weeks.",
                "Many cats that are infected with FHV-1 do not show any signs of clinical illness (i.e., they have a latent infection). Although it is estimated that less than 45% of adult cats with latent herpesvirus infection will develop recurrent ocular disease such as conjunctivitis, approximately 80% of infected cats will become permanent carriers and can infect other cats throughout their life.",
            ],
            prevention: [
                "There is no cure for herpesvirus infections. The therapeutic goal is to reduce the frequency and severity of recurrences. Most cats respond well to medical management and lead relatively normal lives. Minimizing the chance of infection, feeding a premium diet, supplementing the diet with L-lysine daily, reducing stressful situations, and proper vaccination against preventable causes are your cat's best defense.",
                "It is important to note that many cats fully recover from herpes viral conjunctivitis and become carriers of the virus for life. Other cats may contract FHV-1 infection from contact with an infected cat. It is common for entire households of cats to be infected with FHV-1 and experience periodic outbreaks.",
            ],
            stageOne: [],
            stageTwo: [],
            symptoms: [
                "The most common clinical signs of conjunctivitis are squinting or closing of the eye; red, swollen tissue surrounding the eye and eyelids; ocular discharge that may range from clear to yellow-greenish in color; and upper respiratory symptoms such as sneezing or nasal discharge. These signs often appear suddenly and are especially common after stressful situations such as travel, boarding, surgery, or illness. Chemosis, a condition in which the membranes that line the eyelids and surface of the eye appear to have fluid in them, is more commonly associated with Chlamydophila felis infections.",
                "Young kittens with herpes viral conjunctivitis may have such severe infection that their eyes become sealed shut with discharged matter. In this situation, the eyes must be opened or permanent damage, even blindness, may occur. These kittens also typically have runny noses, nasal discharge, sneezing, and coughing.",
            ],
            treatments: [
                "Treatment is determined by your cat's specific clinical signs and problems. It is important to remember that these infections are usually mild and self-limiting. However, if corneal ulcers develop, it is important to treat these appropriately and thoroughly to prevent permanent eye damage.",
                "The following are common treatment regimens used in treating recurrent feline herpes viral conjunctivitis:",
                "Topical antibiotics",
                "Topical anti-viral medications: Famciclovir oral anti-viral medication; Idoxuridine ophthalmic solution; Vidarabine ophthalmic ointment; Trifluridine (also called Triflurothymidine) ophthalmic solution",
                "L-lysine – nutritional supplement often used lifelong to aid in reducing viral replication",
                "Interferon-alpha",
                "Vaccination with the intranasal herpes and calicivirus vaccine two to three times a year may be beneficial in stimulating local immunity",
                "Acyclovir, an oral antiviral medication may be used in severe or poorly responsive cases. Because of its potential toxicity in cats, only cats with a confirmed herpesvirus infection should receive this medication, and it should be started at a low dose. With this medication, it is necessary to monitor the patient’s blood through complete blood count (CBC) testing every two to three weeks.",
            ]
        })
        Firebase.firestore.collection("diseaseDetails").doc("Fatty liver disease").set({
            description: [
                "Malnutrition in birds is common, and is especially common in birds fed only with seeds. If a bird has a diet high in fat, the fat can be deposited in the liver, which can disrupt the liver's functionality. This fatty liver disease can leave the bird vulnerable to other diseases or even kill the bird on its own."
            ],
            prevention: [
                "As fatty liver disease is a result of obesity and malnutrition, it can be prevented by feeding your birds a balanced diet, such as pellets, flowers, fruits and vegetables. Make sure your birds are active, with enough space to move comfortably. Remove uneaten food about 30 minutes after serving to prevent overeating. Weighing your bird regularly can catch weight gain before any severe effects."
            ],
            stageOne: [],
            stageTwo: [],
            symptoms: [
                "As fatty liver disease is caused by obesity, you should keep track of your bird's weight. More noticeable symptoms include changes in behavior, jaundice (yellowed skin), and black spots on the toes or beak caused by blood clotting. However, by the time these symptoms develop, it is more likely that your bird is at a dangerous weight level. If you see these symptoms, you should see a veterinarian."
            ],
            treatments: [
                "You should follow a veterinarian's advice, as procedures such as tube feeding may be necessary. Other common treatments include laxatives or vitamin supplements. However, in almost all cases a change to the bird's diet will be prescribed, which may be adjusted by your vet as your bird recovers."
            ]
        })
        Firebase.firestore.collection("diseaseDetails").doc("Feline Calicivirus Infection").set({
            description: [
                "Feline calicivirus is a virus that is an important cause of upper respiratory infections and oral disease in cats. This virus infects cats throughout the world and can cause disease in both domestic and exotic cat species.",
                "Although several different viruses and bacteria can cause respiratory disease in cats, calicivirus is one of the more common infectious agents isolated in cats with a respiratory infection. Information about some other infectious agents that can cause an upper respiratory infection in cats can be found in \"Feline Upper Respiratory Infection\".",
            ],
            prevention: [
                "Since calicivirus is a highly infectious disease and apparently healthy cats can be carriers of the disease, it can be difficult to prevent your cat from exposure to the virus. Boarding facilities, humane societies, animal shelters, and cat shows are all places where susceptible cats can be readily exposed to calicivirus.",
                "Preventing direct contact between your cat and other cats will greatly minimize the chance that your cat will pick up an infection. In addition, following good sanitation and hygiene practices, such as washing your hands thoroughly before and after petting another cat, will reduce the likelihood that you will spread the disease to your cat.",
                "Susceptible cats can get an infection by direct contact with another infected cat or by environmental exposure to objects such as brushes, food bowls, litter boxes, cat toys, or blankets that have been contaminated with infectious secretions. Objects that have been contaminated with calicivirus can be disinfected by soaking for at least 10-15 minutes in a solution of bleach and water (1 part bleach to 32 parts water).",
                "The standard core vaccines that are given to cats include immunization against calicivirus and will help reduce the severity of disease and shorten the length of the illness if your cat is exposed. Kittens require several boosters of this vaccine between the ages of 8 and 16 weeks, and at least one other booster a year later. After this initial series, the vaccine will also need to be boostered on a regular basis every 1-3 years.",
                "It is particularly important to give your cat a booster vaccine before he or she is placed in a high risk situation such as boarding, grooming, going to a cat show, or otherwise being exposed to cats that could be potential carriers of calicivirus. Your veterinarian will advise you on the recommended booster schedule for your individual cat.",
            ],
            stageOne: [],
            stageTwo: [],
            symptoms: [
                "The typical clinical signs of an upper respiratory infection involve the nose and throat such as sneezing, nasal congestion, conjunctivitis (inflammation of the membranes lining the eyelids), and discharge from the nose or eyes. The discharge may be clear or may become yellow/green in color.",
                "In addition to these typical symptoms, cats with a calicivirus infection often develop ulcers on the tongue, hard palate, gums, lips, or nose.",
                "These cats will usually salivate or drool excessively as the ulcers are very painful. Other non-specific signs of an upper respiratory infection include anorexia, lethargy, fever, enlarged lymph nodes, and squinting.",
                "Some strains of calicivirus may cause an infected cat to develop sudden painful lameness in one or more joints; this lameness occurs more frequently in kittens.",    
                "Although rare, there is one specific strain of feline calicivirus that causes severe generalized disease. The initial symptoms involve the eyes, nose, and mouth, but the infected cat quickly develops a high fever, severe depression, edema of the legs and/or face, jaundice, and symptoms of multiple organ disease. This strain is highly infectious, and the death rate is reportedly up to 67%.",
            ],
            treatments: [
                "Most cats with an uncomplicated calicivirus infection can be treated symptomatically at home. Your veterinarian may prescribe an eye medication to be applied topically if your cat has a purulent (green/yellow) eye discharge.",
                "Although viral infections do not respond to antibacterial drugs, broad spectrum antibacterial drugs (e.g., amoxicillin-clavulanic acid combination, brand name Clavamox®) may be prescribed in an effort to prevent secondary bacterial infections from complicating the disease, particularly in kittens.",
                "Anti-inflammatory medication may be administered by your veterinarian (a one-time injection) to relieve symptoms of lameness. Cats that have persistent ulcers may benefit from treatments that support the immune system.",
                "Cats with nasal or airway congestion may benefit from increased environmental humidification, such as being taken into a steamy bathroom for 10-15 minutes several times per day (see handout “Techniques for Nebulization and Coupage in Cats” for further information). To minimize irritation from discharges, it is often helpful to wipe them away from the cat's face or eyes with a moist tissue.",
                "Since cats with a respiratory infection will have a decreased sense of smell, they often have a decreased appetite - feeding a slightly warmed, highly palatable canned food may help improve their appetite. In some cases, an appetite stimulant may be prescribed.",
                "If a cat is dehydrated, depressed, or has a severe case of illness, your veterinarian will recommend hospitalization for more intensive treatment, including intravenous fluids and other supportive treatments.",
            ]
        })
        Firebase.firestore.collection("diseaseDetails").doc("Feline Urinary Tract (FLUTD)").set({
            description: [
                "In cats, diseases of the lower urinary tract (bladder and urethra) are often grouped under the term feline lower urinary tract disease (FLUTD). This is because it can be challenging to distinguish between the various diseases of the bladder and urethra, and many diseases will affect the entire lower urinary tract.",
                "If all the known causes of the disease have been eliminated, the condition is called Feline Idiopathic Lower Urinary Tract Disease (iFLUTD), Pandora Syndrome, or Feline Idiopathic Cystitis. Idiopathic is a term that means the exact cause is unknown (see handout \"Feline Idiopathic Cystitis\").",
            ],
            prevention: [
                "It is impossible to completely prevent diseases of the lower urinary tract from occurring. However, FLUTD is more common in cats that have low water consumption and in cats that are inactive and obese. All these factors may relate, at least in part, to the frequency with which a cat urinates. Weight control and encouraging exercise and water consumption may be of some help in preventing FLUTD.",
                "If urinary calculi or crystals caused the symptoms of FLUTD, the feeding of special diets may help prevent recurrence.",
            ],
            stageOne: [],
            stageTwo: [],
            symptoms: [
                "Typical signs in cats with FLUTD are those of inflammation and irritation of the lower urinary tract. The common clinical signs are:",
                "Increased frequency of urination called pollakiuria",
                "Difficulty in urinating or dysuria. Affected cats often spend a long time straining in the litter box while passing only small quantities of urine. Some cat owners confuse this with constipation or difficulty passing feces.",
                "The presence of bloody urine called hematuria.",
                "Foul smelling or cloudy urine.",
                "Urinating in unusual places.",
                "Excessive grooming or licking of the genital region.",
                "Complete urinary tract obstruction resulting in the inability to urinate. These cats usually strain to urinate persistently without producing any urine.",
                "With a urinary tract obstruction, it is important to seek immediate veterinary care because blockage to the flow of urine can be a life-threatening complication if untreated.",
            ],
            treatments: [
                "This depends on the underlying cause. For example:",
                "Bacterial infections of the lower urinary tract usually respond well to antibiotic therapy.",
                "If a cat develops a blocked urethra, emergency treatment is required to remove the blockage. Usually the cat will be given a short-acting general anesthetic and the urethra will be flushed or catheterized. Urethral obstruction occurs almost exclusively in male cats. Other treatment options may be recommended based on your cat’s specific blockage.",
                "If bladder stones or uroliths are present, they will have to be removed. Depending on their type, they may be able to be dissolved by using a special diet or dietary additive, or they may require surgical removal. In some cases, this can be determined by the results of a urinalysis.",
                "There is no universal treatment for FLUTD. Each case has to be investigated to determine the underlying cause, and then the treatment has to be tailored to the individual cat. Sometimes despite appropriate tests and treatment, clinical signs may still recur, requiring further therapy and diagnostic testing.",
            ]
        })
        Firebase.firestore.collection("diseaseDetails").doc("Feline panleukopenia").set({
            description: [
                "The term panleukopenia means a decrease in the number of all of the white blood cells in the body. White blood cells play a major role in immunity and are important in defending against infections and diseases.",
                "In severe panleukopenia, white blood cell numbers may drop from the normal of several thousand per milliliter of blood to just a few hundred. This makes an affected cat extremely vulnerable to other infections.",
            ],
            prevention: [
                "Fortunately, excellent vaccines are available and are part of the core feline vaccination program. Kittens require several boosters of this vaccine between the ages of 8 and 16 weeks, and at least one other booster a year later.",
                "The immunity produced by the panleukopenia vaccine is generally strong but it decreases with time, at a faster rate in some cats than others. Therefore, booster vaccinations every one to three years are strongly recommended. Your veterinarian will discuss the appropriate frequency of booster vaccinations for your cat's lifestyle.",    
                "Modern panleukopenia vaccines are safe and side effects are extremely uncommon. However, as with all vaccines, some cats may be lethargic for a day or two after vaccination.",
            ],
            stageOne: [],
            stageTwo: [],
            symptoms: [
                "There is some variation in the clinical signs, but cats typically experience depression or listlessness, which may progress to collapse. Since the virus infects and destroys rapidly growing cells, the intestinal tract is often affected. Vomiting and diarrhea are frequent and the diarrhea may contain blood. The hair coat quickly becomes dull and rough, and the skin loses its elasticity due to dehydration.",
                "Often cats with panleukopenia develop other infections because their immune system is weakened. They may have purulent (green/yellow) discharge from the eyes and nose. In young kittens with severe infections, sometimes the only clinical sign is sudden death.",
            ],
            treatments: [
                "As for most viral diseases, there is no specific treatment for FPL. Antibiotics do not kill viruses, but are helpful in controlling the secondary bacterial infections that commonly develop due to the lack of white blood cells and the resulting reduced immunity.",
                "Dehydration and shock are life-threatening components of FPL and intravenous fluid therapy and intensive nursing care is critical. If the cat receives aggressive supportive care through the initial stages of illness, prognosis for a full recovery is good.",
            ]
        })
        Firebase.firestore.collection("diseaseDetails").doc("Gout").set({
            description: [
                "Gout is a disease caused by kidney failure. A bird with gout cannot properly remove uric acid, and it is instead deposited in tissues or joints. The uric acid forms crystals which can cause pain and sometimes permanent damage."
            ],
            prevention: [
                "The easiest way to prevent gout is with a well-rounded diet. Monitor your bird so you can catch warning signs early and treat gout before it progresses."
            ],
            stageOne: [],
            stageTwo: [],
            symptoms: [
                "The earliest warning signs of gout for a bird include swollen or stiff leg or wing joints, especially if the bird often shifts its weight around. The bird may be unable to perch or fly, instead preferring to remain on the floor of its cage."
            ],
            treatments: [
                "There are both medications and surgical procedures to help birds suffering from gout, but neither can prevent some of the lasting effects. Your veterinarian will likely recommend a special diet for your bird while it recovers, which you should hold it to."
            ]
        })
        Firebase.firestore.collection("diseaseDetails").doc("Leptospirosis").set({
            description: [
                "Leptospirosis is a disease caused by infection with Leptospira bacteria. These bacteria can be found worldwide in soil and water. There are many strains of Leptospira bacteria that can cause disease. Leptospirosis is a zoonotic disease, which means it can be spread from animals to people. Infection in people can cause flu-like symptoms and can cause liver or kidney disease.",
                "In the United States, most cases of human leptospirosis result from recreational activities involving water. Infection resulting from contact with an infected pet is much less common, but it is possible. Leptospirosis is more common in areas with warm climates and high annual rainfall but it can occur anywhere.",
            ],
            prevention: [
                "Dogs can become infected and develop leptospirosis if their mucous membranes (or skin with any wound, such as a cut or scrape) come into contact with infected urine, urine-contaminated soil, water, food or bedding; through a bite from an infected animal; by eating infected tissues or carcasses; and rarely, through breeding. It can also be passed through the placenta from the mother dog to the puppies.",
                "Currently available vaccines effectively prevent leptospirosis and protect dogs for at least 12 months. Annual vaccination is recommended for at-risk dogs. Reducing your dog’s exposure to possible sources of the Leptospira bacteria can reduce its chances of infection.",
            ],
            stageOne: [],
            stageTwo: [],
            symptoms: [
                "The signs of leptospirosis in dogs vary. Some infected dogs do not show any signs of illness, some have a mild and transient illness and recover spontaneously, while others develop severe illness and death.",
                "Signs of leptospirosis may include fever, shivering, muscle tenderness, reluctance to move, increased thirst, changes in the frequency or amount of urination, dehydration, vomiting, diarrhea, loss of appetite, lethargy, jaundice (yellowing of the skin and mucous membranes), or painful inflammation within the eyes. The disease can cause kidney failure with or without liver failure. Dogs may occasionally develop severe lung disease and have difficulty breathing. Leptospirosis can cause bleeding disorders, which can lead to blood-tinged vomit, urine, stool or saliva; nosebleeds; and pinpoint red spots (which may be visible on the gums and other mucous membranes or on light-colored skin). Affected dogs can also develop swollen legs (from fluid accumulation) or accumulate excess fluid in their chest or abdomen.",
                "Leptospirosis may be suspected based on the exposure history and signs shown by the dog, but many of these signs can also be seen with other diseases. In addition to a physical examination, your veterinarian may recommend a number of other tests such as blood tests, urine tests, radiographs (x-rays), and an ultrasound examination.",   
            ],
            treatments: [
                "Leptospirosis is generally treated with antibiotics and supportive care. When treated early and aggressively, the chances for recovery are good but there is still a risk of permanent residual kidney or liver damage.",
                "Although an infected pet dog presents a low risk of infection for you and your family, there is still some risk. If your dog has been diagnosed with leptospirosis, take the following precautions to protect yourself:",
                "Administer antibiotics as prescribed by your veterinarian;",
                "Avoid contact with your dog’s urine;",
                "If your dog urinates in your home, quickly clean the area with a household disinfectant and wear gloves to avoid skin contact with the urine;",
                "Encourage your dog to urinate away from standing water or areas where people or other animals will have access;",
                "Wash your hands after handling your pet.",
                "If you are ill or if you have questions about leptospirosis in people, consult your physician. If you are pregnant or immunocompromised (due to medications, cancer treatment, HIV or other conditions), consult your physician for advice.",
            ]
        })
        Firebase.firestore.collection("diseaseDetails").doc("Para-flu dog").set({
            description: [
                "Canine influenza (CI), or dog flu, is a highly contagious respiratory infection of dogs that is caused by an influenza A virus. In the U.S., canine influenza has been caused by two influenza strains. The first strain reported in the United States, beginning in 2004, was an H3N8 influenza A virus. This strain is closely related to the virus that causes equine influenza, and it is thought that the equine influenza virus mutated to produce the canine strain.",
                "In 2015, an outbreak that started in Chicago was caused by a separate canine influenza virus, H3N2. The strain causing the 2015 outbreak was almost genetically identical to an H3N2 strain previously reported only in Asia – specifically, Korea, China and Thailand. In Asia. This H3N2 strain is believed to have resulted from the direct transfer of an avian influenza virus  – possibly from among viruses circulating in live bird markets – to dogs. Since March 2015, thousands of dogs have been confirmed positive for H3N2 canine influenza across the U.S.",
            ],
            prevention: [
                "There are multiple canine influenza vaccines available that vaccinate for either H3N8 or H3N2, as well as combination products that vaccinate for both H3N8 and H3N2. There also are products licensed for both dogs and cats. Canine influenza vaccines are considered \"lifestyle\" vaccines, meaning the decision to vaccinate is based on a dog’s risk of exposure. Dog owners should consult their veterinarian to determine whether vaccination is needed.",
                "Canine influenza virus can be spread via direct contact with respiratory secretions from infected dogs (via barking, coughing or sneezing), and by contact with contaminated inanimate objects. Therefore, dog owners whose dogs are coughing or exhibiting other signs of respiratory disease should not participate in activities or bring their dogs to facilities where other dogs can be exposed to them. Clothing (including shoes), equipment, surfaces, and hands should be cleaned and disinfected after exposure to dogs showing signs of respiratory disease to prevent transmission of infection to susceptible dogs. Clothing can be adequately cleaned by using a detergent at normal laundry temperatures.",
            ],
            stageOne: [],
            stageTwo: [],
            symptoms: [
                "Two clinical syndromes have been seen in dogs infected with the canine influenza virus—a mild form of the disease and a more severe form that is accompanied by pneumonia.",
                "Mild form — Dogs suffering with the mild form of canine influenza develop a soft, moist cough that persists for 10 to 30 days. They may also be lethargic and have reduced appetite and a fever. Sneezing and discharge from the eyes and/or nose may also be observed. Some dogs have a dry cough similar to the traditional \"kennel cough\" caused by Bordetella bronchiseptica/parainfluenza virus complex. Dogs with the mild form of influenza may also have a thick nasal discharge, which is usually caused by a secondary bacterial infection.",
                "Severe form — Dogs with the severe form of canine influenza develop high fevers (104ºF to 106ºF) and have clinical signs of pneumonia, such as increased respiratory rates and effort. Pneumonia may be due to a secondary bacterial infection.",
                "Fatal cases of pneumonia resulting from infection with canine influenza virus have been reported in dogs, but the fatality rate is low (less than 10%). Most dogs recover in 2-3 weeks.",
            ],
            treatments: [
                "As with any disease caused by a virus, treatment is largely supportive. Good animal care practices and nutrition assist dogs in mounting an effective immune response.",
                "Dogs with canine influenza should be isolated to prevent transmission of the virus to other dogs or, in the case of H3N2, cats.",
                "The course of treatment depends on the pet's condition, including the presence or absence of a secondary bacterial infection, pneumonia, dehydration, or other medical issues (e.g., pregnancy, pre-existing respiratory disease, compromised immune system, etc.). The veterinarian might prescribe medications, such as an antibiotic (to fight secondary infections) and/or a nonsteroidal anti-inflammatory (to reduce fever, swelling and pain). Dehydrated pets may need fluid therapy to restore and maintain hydration.  Other medications, or even hospitalization, may also be necessary for more severe cases.",
            ]
        })
        Firebase.firestore.collection("diseaseDetails").doc("Psittacosis").set({
            description: [
                "Psittacosis is a bacterial infection. Also known as parrot fever or avian chlamydiosis, it is usually transferred via another bird's droppings, feathers, or eggs. Some birds are asymptomatic, which contributes to the disease's spread. The disease can be transmitted to humans, but it is treatable for both birds and their owners."
            ],
            prevention: [
                "Make sure to regularly clean your birds' cages. If you have multiple birds in a cage, make sure they have enough space to avoid being cramped. It's a good idea to test any new birds for psittacosis, even if they have no symptoms. Use caution while handling any birds you suspect are sick."
            ],
            stageOne: [],
            stageTwo: [],
            symptoms: [
                "Notable symptoms of psittacosis in birds include difficulty eating and breathing, or greenish-yellow diarrhea. In addition, infected birds may have unusual nasal or optical secretions, or even partial paralysis."
            ],
            treatments: [
                "Psittacosis can be treated effectively with antibiotics. They can either be administered with the bird's water or via injection."
            ]
        })
        Firebase.firestore.collection("diseaseDetails").doc("Rabies").set({
            description: [
                "Rabies is a deadly disease caused by a virus that attacks the nervous system. The virus is secreted in saliva and is usually transmitted to people and animals by a bite from an infected animal. Less commonly, rabies can be transmitted when saliva from a rabid animal comes in contact with an open cut on the skin or the eyes, nose, or mouth of a person or animal. Once the outward signs of the disease appear, rabies is nearly always fatal.",
            ],
            prevention: [
                "All mammals are susceptible to rabies. Vaccination programs and control of stray animals have been effective in preventing rabies in most pets. Approved rabies vaccines are available for cats, dogs, ferrets, horses, cattle and sheep. Licensed oral vaccines are also being used for mass immunization of wildlife, particularly raccoons.", 
                "Reduce the possibility of exposure to rabies by not letting your pets roam free. Keep cats and ferrets indoors, and supervise dogs when they are outside. Spaying or neutering your pet may decrease roaming tendencies and will prevent them from contributing to the birth of unwanted animals.",
                "Don’t leave exposed garbage or pet food outside, as it may attract wild or stray animals.",
                "Wild animals should never be kept as pets. Not only may this be illegal, but wild animals pose a potential rabies threat to caretakers and to others.",
                "Observe all wild animals from a distance. A rabid wild animal may appear tame but don’t go near it. Teach children NEVER to handle unfamiliar animals—even if they appear friendly.",
                "If you see a wild animal acting strangely, report it to the city or county animal control department.",
                "Bat-proof your home and other structures to prevent bats from nesting and having access to people or pets.",
                "Dogs are still a significant source of rabies in other countries, particularly in Asia and Africa, so travelers should be aware of this risk and seek medical advice about vaccination prior to traveling outside of the United States.",
            ],
            stageOne: [],
            stageTwo: [],
            symptoms: [
                "Once the rabies virus enters the body, it travels along the nerves to the brain. Animals with rabies may show a variety of signs, including fearfulness, aggression, excessive drooling, difficulty swallowing, staggering, paralysis and seizures. Aggressive behavior is common, but rabid animals may also be uncharacteristically affectionate.",
                "Although the most common signs of rabies are behavioral changes and unexplained paralysis, rabies should be considered in all cases of unexplained neurological disease. There is no treatment once the clinical signs of rabies appear.",
                "Rabies infection of an animal can only be confirmed after death, through microscopic examination of the animal’s brain.",
            ],
            treatments: [
                "Consult your veterinarian immediately and report the bite to local animal control authorities.",
                "Even if your dog, cat or ferret has a current vaccination, he/she should be revaccinated immediately, kept under the owner’s control, and observed for a period as specified by state law or local ordinance. Animals with expired vaccinations will need to be evaluated on a case-by-case basis.",
                "Dogs, cats and ferrets that have never been vaccinated and are exposed to a rabid animal may need to be euthanatized in accordance with regulations or placed in strict isolation for six months.",
            ]
        })
        //End of diseaseDetails data injection

          */
    }
}
