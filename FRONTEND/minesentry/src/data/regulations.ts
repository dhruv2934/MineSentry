import { Regulation } from '../types';

export const mockRegulations: Regulation[] = [
  {
    id: 'CMR-2017-123',
    code: 'CMR-123',
    act_name: 'Coal Mines Regulations, 2017',
    chapter: 'Chapter IX - Mine Workings',
    regulation_number: '123',
    title: 'Support Plan and Systematic Support Rules (SSR)',
    summary: 'Specifies mandatory systematic support for roof and sides of every gallery, roadway, or face within underground coal mines.',
    full_text: 'The owner, agent and manager of every coal mine shall formulate a Support Plan based on Scientific Study and geotechnical classification of roof and side rocks. Every mine working within nine meters of the working face shall be supported systematically in conformity with the approved Support Plan. Pull-out tests shall be carried out to ensure minimum 100 kN anchorage capacity.',
    risk_category: 'Strata & Support',
    statutory_penalty: 'Statutory closure of unsupported workings under Section 22(1) of Mines Act, 1952.'
  },
  {
    id: 'CMR-2017-153',
    code: 'CMR-153',
    act_name: 'Coal Mines Regulations, 2017',
    chapter: 'Chapter XII - Ventilation',
    regulation_number: '153',
    title: 'General Ventilation Requirements & Velocity Limits',
    summary: 'Mandates adequate ventilation volume to dilute, render harmless and carry away all inflammable and noxious gases.',
    full_text: 'The ventilation in every mine shall be adequate to clear inflammable and noxious gases. In no case shall the percentage of inflammable gas in any return airway exceed 0.75%, or in any working place exceed 1.25%. The air current shall not have a velocity less than 30 meters per minute in active faces or exceed 8 meters per second in main roadways.',
    risk_category: 'Ventilation & Gases',
    statutory_penalty: 'Withdrawal of workforce and cessation of electrical power supply.'
  },
  {
    id: 'CMR-2017-106',
    code: 'CMR-106',
    act_name: 'Coal Mines Regulations, 2017',
    chapter: 'Chapter VIII - Opencast Workings',
    regulation_number: '106',
    title: 'Opencast Bench Height, Berms and Spoil-Banks',
    summary: 'Governs geometry of opencast benches, waste dump slope stability, and perimeter safety berm dimensions.',
    full_text: 'In opencast workings, the height of any bench in overburden shall not exceed the maximum reach of the excavator. In no case shall the slope angle of any spoil-bank exceed the angle of repose. A continuous substantial parapet or berm equal to the tire diameter of the largest transport vehicle shall be provided along the crest of every haul road and dump edge.',
    risk_category: 'Haulage & Transport',
    statutory_penalty: 'Immediate prohibition of dumping operations; equipment impoundment.'
  },
  {
    id: 'CMR-2017-142',
    code: 'CMR-142',
    act_name: 'Coal Mines Regulations, 2017',
    chapter: 'Chapter XI - Precautions Against Dust, Gas and Fire',
    regulation_number: '142',
    title: 'Precautions Against Coal Dust & Barrier Standards',
    summary: 'Mandates inert stone dusting, water spraying systems, and explosion suppression barriers.',
    full_text: 'All accessible mine workings, haulage roadways, and transfer points shall be treated with incombustible dust or water so that the dust on roof, floor and sides contains not less than 75% incombustible matter. Explosion barriers conforming to DGMS standard designs shall be erected and inspected weekly.',
    risk_category: 'Dust & Spontaneous Combustion',
    statutory_penalty: 'Cessation of coal winning operations; show-cause notice to Mine Manager.'
  },
  {
    id: 'DGMS-TECH-CIRC-06',
    code: 'DGMS-TC-06',
    act_name: 'DGMS Technical Circulars (Safety)',
    chapter: 'DGMS Strata Control Directives',
    regulation_number: 'Circular 06 of 2021',
    title: 'Guidelines for Mechanized Roof Bolting & Cable Bolting in Deep Seams',
    summary: 'Prescribes resin capsule shelf life monitoring, resin capsule mixing times, and electronic load cell monitoring.',
    full_text: 'All underground coal mines extracting seams at depths greater than 200m shall employ continuous dual-height tell-tale extensometers every 30 meters along trunk roadways. Pre-tensioning of roof bolts must achieve minimum 50 kN initial clamp force within 10 minutes of installation.',
    risk_category: 'Strata & Support',
    statutory_penalty: 'Regulatory audit demerit and compulsory strata safety review.'
  }
];
