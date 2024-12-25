// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DocumentCode2 } from 'iconsax-react';

// type

// icons
const icons = {
  samplePage: DocumentCode2
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const chatPage = {
  id: 'sample-page',
  title: <FormattedMessage id="chat-page" />,
  type: 'group',
  url: '/chat-gpt',
  icon: icons.samplePage
};

export default chatPage;
