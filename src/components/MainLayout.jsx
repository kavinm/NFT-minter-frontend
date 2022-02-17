import 'antd/dist/antd.css';
import './Main.css'

import { Layout, Menu } from 'antd';
import { UploadOutlined, PlusCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';


const { Content, Footer, Sider } = Layout;


const MainLayout = ({children}) => {
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1" icon={<PlusCircleOutlined />}>
            Mint an NFT
          </Menu.Item>
          <Menu.Item key="2" icon={<UnorderedListOutlined />}>
            Mint a collection
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            Other random tag
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200, top: 0, height: '100vh' }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>NFT Minter tool (Company Name)</Footer>
      </Layout>
    </Layout>
  )
}

export default MainLayout