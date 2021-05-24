import React from 'react';
// import { useParams } from 'react-router-dom';
import CampaignDetail from '../containers/CampaignDetail';
// import NavigationContainer from '../containers/Dashboard/Navigation';
// import { apiGetDataCampaign } from '../apis/campaign';
// import routes from '../constants/route';

export default function InfoCampaign(props) {
  const { history } = props;
  // const { campaignId } = useParams();
  // const [dataInfoCampaign, setDataInfoCampaign] = useState({});
  // let navLink;
  // useEffect(() => {
  //   apiGetDataCampaign(campaignId)
  //     .then((res) => {
  //       setDataInfoCampaign(res.result);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);

  // if (dataInfoCampaign) {
  //   navLink = [
  //     {
  //       title: 'Home',
  //       link: routes.HOME,
  //     },
  //     {
  //       title: dataInfoCampaign.name,
  //     },
  //   ];
  // }

  return (
    <div>
      {/* <NavigationContainer navLink={navLink} /> */}
      <CampaignDetail history={history} />
    </div>
  );
}
