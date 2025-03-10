export default {
  data() {
    return {
      psychicPowersRepository: [
        // Universal
        {
          name: 'Smite',
          cost: 0,
          discipline: 'Universal',
          keywords: ['Psychic'],
          effect: 'Inflict 1d3 Mortal Wounds',
          source: {
            book: 'core',
            version: 'v1',
            page: '343',
          },
          prerequisites: [],
          crunch: {
            dn: '',
            activation: '',
            duration: '',
            range: '',
            multiTarget: true,
            effect: '',
            potency: [],
          },
        },
        // Minor
        {
          name: 'Chameleon',
          cost: 8,
          discipline: 'Minor',
          keywords: ['Psychic'],
          effect: 'Conceals the psyker',
        },
        {
          name: 'Compel',
          cost: 10,
          discipline: 'Minor',
          keywords: ['Psychic'],
          effect: 'Command a target to perform a short, simple act',
          source: {
            book: 'core',
            version: 'v1',
            page: '349',
          },
          prerequisites: [],
          crunch: {
            dn: '5',
            activation: '2 Simple Actions',
            duration: '1 Round',
            range: '5 meters',
            multiTarget: false,
            effect: 'The psyker implants a simple command in the mind of a nearby creature. This command must be short (consisting of a single action), simple and obvious, but can otherwise overcome the given creature’s own interests or base instincts. Example commands include: “drop the weapon,” “open the door” or “push him.” Suggestions cannot make a creature perform an action that they are simply incapable of performing—a psyker cannot make a cyber mastiff work a door handle for example. The target creature must successfully pass a Willpower test (DN 4) or is compelled to obey the Compel.',
            potency: [
              { value: 1, text: '+1DN to the Willpower test to resist.' },
            ],
          },
        },
        {
          name: 'Conceal Phenomena',
          cost: 5,
          discipline: 'Minor',
          keywords: ['Psychic'],
          effect: 'Hides the presence of a psychic power',
        },
        {
          name: 'Create Flame',
          cost: 10,
          discipline: 'Minor',
          keywords: ['Fire', 'Psychic'],
          effect: 'Outline a part of your body in fire',
        },
        {
          name: 'Dull Pain',
          cost: 8,
          discipline: 'Minor',
          keywords: ['Psychic'],
          effect: 'Reduce incoming Shock damage',
        },
        {
          name: 'Flash Bang',
          cost: 8,
          discipline: 'Minor',
          keywords: ['Auditory', 'Light', 'Psychic'],
          effect: 'Potentially blind enemies and cause Shock damage',
        },
        {
          name: 'Fortune',
          cost: 10,
          discipline: 'Minor',
          keywords: ['Psychic'],
          effect: 'Adds bonus die to one test',
        },
        {
          name: 'Inflict Pain',
          cost: 8,
          discipline: 'Minor',
          keywords: ['Psychic'],
          effect: 'Potentially stagger enemies and cause Shock damage',
        },
        {
          name: 'Jam Mechanism',
          cost: 10,
          discipline: 'Minor',
          keywords: ['Kinetic', 'Psychic'],
          effect: 'Render a machine inoperable',
        },
        {
          name: 'Levitation',
          cost: 7,
          discipline: 'Minor',
          keywords: ['Psychic'],
          effect: 'Float up and down, or arrest a fall',
        },
        {
          name: 'Orb',
          cost: 5,
          discipline: 'Minor',
          keywords: ['Electric', 'Psychic'],
          effect: 'Creates an orb to shed light',
        },
        {
          name: 'Phantom Grip',
          cost: 8,
          discipline: 'Minor',
          keywords: ['Kinetic', 'Psychic'],
          effect: 'Manipulate objects with your mind',
        },
        {
          name: 'Psyniscience',
          cost: 5,
          discipline: 'Minor',
          keywords: ['Psychic'],
          effect: 'Detect psychic powers and phenomena',
        },
        {
          name: 'Shove',
          cost: 8,
          discipline: 'Minor',
          keywords: ['Kinetic', 'Psychic'],
          effect: 'Shove an enemy and potentially knock prone',
        },
        {
          name: 'Voices',
          cost: 5,
          discipline: 'Minor',
          keywords: ['Auditory', 'Psychic'],
          effect: 'Creates ghostly voices',
        },
        // Biomancy
        {
          name: 'Enfeeble',
          cost: 15,
          discipline: 'Biomancy',
          keywords: ['Psychic'],
          effect: 'Reduces enemy\'s strenth and inflict shock',
        },
        {
          name: 'Life Leech',
          cost: 15,
          discipline: 'Biomancy',
          keywords: ['Psychic'],
          effect: 'Damage enemy and heal yourself',
        },
        {
          name: 'Living Lightning ',
          cost: 15,
          discipline: 'Biomancy',
          keywords: ['Psychic'],
          effect: 'The psyker moves faster and may take a bonus action',
        },
        {
          name: 'Phantom Form',
          cost: 15,
          discipline: 'Biomancy',
          keywords: ['Psychic'],
          effect: 'Pass through solid objects',
        },
        {
          name: 'Regenerate',
          cost: 15,
          discipline: 'Biomancy',
          keywords: ['Psychic'],
          effect: 'Heal you injuries  and regenerate ost body parts',
        },
        // Divination
        {
          name: 'Forewarning', cost: 15, discipline: 'Divination', keywords: ['Psychic'], effect: 'Gain bonus Defence and may Seize the Initiative',
        },
        {
          name: 'Glimpse the future', cost: 15, discipline: 'Divination', keywords: ['Psychic'], effect: 'See glimpses of possible outcomes, gain an additional Campaign Card',
        },
        {
          name: 'Prophetic Visions', cost: 5, discipline: 'Divination', keywords: ['Psychic'], effect: 'Gain insightful visions and bonus Wrath',
        },
        {
          name: 'Scry', cost: 5, discipline: 'Divination', keywords: ['Psychic'], effect: 'Remotely view events or places',
        },
        {
          name: 'Omens of Doom', cost: 15, discipline: 'Divination', keywords: ['Psychic'], effect: 'Use a foretelling to make an opponent hindered and vulnerable',
        },
        // Pyromancy
        {
          name: 'Fiery Form', cost: 15, discipline: 'Pyromancy', keywords: ['Fire', 'Psychic'], effect: 'Surround your body with flames and become immune to fire or melta damage',
        },
        {
          name: 'Gout of Flame', cost: 5, discipline: 'Pyromancy', keywords: ['Fire', 'Psychic'], effect: 'Hit an area with a blast of flame',
        },
        {
          name: 'Molten Beam', cost: 20, discipline: 'Pyromancy', keywords: ['Fire', 'Psychic'], effect: 'Create a beam of energy that melts through targets',
        },
        {
          name: 'Spontaneuous Combustion', cost: 10, discipline: 'Pyromancy', keywords: ['Fire', 'Psychic'], effect: 'Enemies burst into flames',
        },
        {
          name: 'Wall of Flame', cost: 15, discipline: 'Pyromancy', keywords: ['Fire', 'Psychic'], effect: 'Create a blazing wall of fire',
        },
        // Telekinesis
        {
          name: 'Assail', cost: 15, discipline: 'Telekinesis', keywords: ['Kinetic', 'Psychic'], effect: 'Fling objects at opponents',
        },
        {
          name: 'Crush', cost: 15, discipline: 'Telekinesis', keywords: ['Kinetic', 'Psychic'], effect: 'Restrain and damage targets',
        },
        {
          name: 'Flight', cost: 15, discipline: 'Telekinesis', keywords: ['Kinetic', 'Psychic'], effect: 'Telekinetically fly through the air',
        },
        {
          name: 'Force Field', cost: 15, discipline: 'Telekinesis', keywords: ['Kinetic', 'Psychic'], effect: 'Create a protective field around yourself',
        },
        {
          name: 'Shockwave', cost: 15, discipline: 'Telekinesis', keywords: ['Kinetic', 'Psychic'], effect: 'Unleash a blast of mental force around you',
        },
        // Telepathy
        {
          name: 'Fog the Mind', cost: 15, discipline: 'Telepathy', keywords: ['Telepathy', 'Psychic'], effect: 'Potentially hinder and stagger all enemies within range',
        },
        {
          name: 'Mind Probe', cost: 15, discipline: 'Telepathy', keywords: ['Telepathy', 'Psychic'], effect: 'Invade another\'s mind to discover answers',
        },
        {
          name: 'Psychic Shriek', cost: 10, discipline: 'Telepathy', keywords: ['Psychic'], effect: 'Potentially stagger enemies and cause Shock damage to their mind',
        },
        {
          name: 'Telepathy', cost: 5, discipline: 'Telepathy', keywords: ['Telepathy', 'Psychic'], effect: 'Mentally communicate with others',
        },
        {
          name: 'Terrify', cost: 15, discipline: 'Telepathy', keywords: ['Telepathy', 'Psychic'], effect: 'Overcome enemies within range with psychic fear',
        },
        // Maleficarum
        {
          name: 'Boil Blood', cost: 15, discipline: 'Maleficarum', keywords: ['Chaos', 'Psychic'], effect: 'Inflict Shock and Mortal Wounds on enemies in an area',
        },
        {
          name: 'Puppet Master', cost: 20, discipline: 'Maleficarum', keywords: ['Chaos', 'Psychic'], effect: 'Control another\'s mind',
        },
        {
          name: 'Soul Shivrel', cost: 20, discipline: 'Maleficarum', keywords: ['Chaos', 'Psychic'], effect: 'Corrupt your enemies and infl ict Mortal Wounds',
        },
        {
          name: 'Touch of Corruption', cost: 15, discipline: 'Maleficarum', keywords: ['Chaos', 'Psychic'], effect: 'Inflict Shock, Corruption, and potentially mutate enemies',
        },
        {
          name: 'Walking Nightmare', cost: 10, discipline: 'Maleficarum', keywords: ['Chaos', 'Psychic'], effect: 'Force another to experience horrifi c hallucinations',
        },
        // Runes of Battle
        {
          name: 'Conceal/Reveal', cost: 20, discipline: 'Runes of Battle', keywords: ['Aeldari', 'Psychic'], effect: 'Hide or expose beings in an area',
        },
        {
          name: 'Embolden/Horrify', cost: 20, discipline: 'Runes of Battle', keywords: ['Aeldari', 'Psychic'], effect: 'Make allies braver or enemies more fearful',
        },
        {
          name: 'Empower/Everate', cost: 30, discipline: 'Runes of Battle', keywords: ['Aeldari', 'Psychic'], effect: 'Make allies do more damage or make enemies inflict less',
        },
        {
          name: 'Enhance/Drain', cost: 20, discipline: 'Runes of Battle', keywords: ['Aeldari', 'Psychic'], effect: 'Make allies better in melee or enemies struggle',
        },
        {
          name: 'Protect/Jinx', cost: 20, discipline: 'Runes of Battle', keywords: ['Aeldari', 'Psychic'], effect: 'Make alies tougher to hurt or enemies easier',
        },
        {
          name: 'Quicken/Delay', cost: 20, discipline: 'Runes of Battle', keywords: ['Aeldari', 'Psychic'], effect: 'Twists time itself, briefly altering its flow for a select few',
        },
      ],
    };
  },
};
