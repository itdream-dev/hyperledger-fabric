*阅读本文的其他语言版本：[English](README.md)。*
# LinuxONE 上的 Hyperledger Fabric 和 Hyperledger Composer

## 架构
![流程图](images/FlowDiagram.png)



此次 Code Pattern 将指导您完成以下流程。

1. 请求访问 LinuxONE Community Cloud。
2. 在 LinuxONE Community Cloud 上创建您的 Linux 虚拟机。
3. 设置和验证您的区块链环境。
4. 在 Hyperledger Composer 中创建一个区块链项目。
5. 通过 Composer Rest Server 和 NodeRed 与区块链和第三方 API 进行交互。


## 应用程序概述
此次 Code Pattern 的目标是，让您基本了解开发人员如何使用 Hyperledger Composer 与 Hyperledger Fabric 进行交互。在此次网络研讨会中，您将使用一个基于浏览器的用户界面来修改链代码，测试您的代码并部署更改。您还将了解如何使用工具获取代码并生成 API，以便通过 REST-ful 接口实现应用程序集成。 

本实验将分为 3 个部分： 

### 第 1 部分 \- 设置您的 LinuxONE Community Cloud 虚拟机

1. [请求访问 LinuxONE Community Cloud。](#request-access-to-linuxone-community-cloud)

2. [创建您的 LinuxONE 虚拟机](#create-your-linuxone-guest)

3. [针对 Hyperledger Fabric 和 Hyperledger Composer 设置您的 Linux 虚拟机](#setup-your-linux-guest-for-hyperledger-fabric-and-hyperledger-composer)

4. [验证 Hyperledger Fabric 和 Hyperledger Composer 的安装](#verify-the-installation-of-hyperledger-fabric-and-hyperledger-composer)

### 第 2 部分 - 创建一个区块链应用程序并生成 API

5. [导入您的区块链应用程序的组件](#importing-the-components-of-your-blockchain-application)

6. [创建您的区块链应用程序](#creating-your-blockchain-application)

7. [测试应用程序代码](#test-application-code)

8. [将应用程序部署到 Hyperledger Fabric](#deploy-application-to-hyperledger-fabric)

9. [利用您的区块链应用程序生成 API](#generating-api)

### 第 3 部分 - 通过 NodeRED 利用区块链 API

10. [将您的流导入 NodeRED 中](#importing-your-flow-into-nodered)

11. [通过仪表板与区块链进行交互](#interacting-with-blockchain-through-a-dashboard)



## 网络研讨会操作说明

### 场景概述
在本次 Code Pattern 中，我们将模拟一个恒温器和温度计来为我们提供温度数据。在真实场景中，这可能是家里或办公建筑中的温度传感器。该传感器可以通过 API 连接到 Nest 等真实恒温器或其他智能家庭设备。要避免家庭成员、室友、朋友或孩子们过度运行空调或取暖器，必须首先确定他们是否有权限运行 Hyperledger Fabric 上的智能合约所定义的交易来调节恒温器。该合约会检查账本中记录的温度计的值，以确定他们的恒温器调节是否环保。其次，它会集成 Weather.com 来检查当前温度，并根据智能合约的条款将恒温器调节到理想设置。 

### 第 1 部分 - 设置您的 LinuxONE Community Cloud 虚拟机

在 Code Pattern 的这一部分，将请求访问 LinuxONE Community Cloud，建立一个 SLES 虚拟机，运行一个设置脚本并验证安装。

#### 请求访问 LinuxONE Community Cloud。

1. 在浏览器中访问 https://developer.ibm.com/linuxone/。

   ![LinuxONE Community Cloud 页面](images/CommunityCloudPage.png)

2. **单击** *Start your trial now*。

   ![单击 Start your trial now。](images/StartNow.png)

3. **完成**页面上的必填字段并**选择** *Request your trial*。

   ![完成应用程序](images/GuestApplication.png)

4. 您将转到以下页面。**单击** *Sign In*。

   ![单击 Sign In。](images/SignIn.png)

5. 检查电子邮件，查找类似下图的注册确认邮件。在下一步中，需要使用这封电子邮件中的用户 ID 和密码。

   ![检查电子邮件查找注册确认邮件。](images/RegistrationConfirmationEmail.png)

   #### 创建您的 LinuxONE 虚拟机

6. 返回浏览器中，**输入**来自该电子邮件中的*用户 ID* 和*密码*。**单击** *Sign in*。

   * 备注：现在是将该密码更改为您容易记住的密码的好时机。为此，可以在首次登录后，从网页的右上角选择您的用户名并选择帐户设置。

   ![登录到 LinuxONE Community Cloud。](images/SignInUserIDPW.png)

7. 在 IBM LinuxONE Community Cloud 的主页中，在 Infrastructure 下的 Virtual Servers 上**选择** *Manage Instances*。

   ![选择 Virtual Servers。](images/VirtualServers.png)

8. **单击** create。

   ![单击 create。](images/Create.png)

9. 完成以下信息：

   * 选择 *General purpose VM* 作为类型。

   * 输入实例名称 -  `DJBlockchain`。

   * 输入实例描述 -  `Blockchain guest for Developers Journey`。

   * 选择 *SLES12 SP3* 作为镜像。

   * 选择 *LinuxONE-Medium* 作为风格。

     ![创建您的 LinuxONE 虚拟机。](images/LinuxONEFields.png)

10. **向下滚动**。在 *Select a SSH Key Pair* 下，**单击** *create*。

 ![单击 create。](images/CreateKeyPair.png)

11. 在弹出的对话框中，**输入**密钥名称 `DJBlockchain` 并**选择** *Create a new key pair*。

    ![输入密钥名称并选择 create。](images/KeyPairName.png)

12. 根据您的计算机，您可能会收到提示，询问您是否希望保存新的密钥对。如果希望保存，则选择 **Save File**。

    ![单击 Save File。](images/SaveFile.png)

13. 在 *Select a SSH Key Pair* 框中，**选择**新创建的密钥对 *DJBlockchain*。

    ![选择 DJBlockchain。](images/SelectDJBlockchain.png)

14. 检查 Current Selection 信息的准确性，然后**单击**屏幕底部的 *create* 创建您的 SLES 12 LinuxONE 虚拟机。

    ![单击 create。](images/CreateGuest.png)

15. 观看新创建的虚拟机的状态，完成以下启动阶段：  networking :arrow_right: spawning :arrow_right: Active。当虚拟机显示 active 时，表明它已准备好使用。

    * *备注* - 记下您的虚拟机的 IP 地址。后续步骤需要使用它。

    ![虚拟机准备就绪！](images/StartedGuest.png)

16. 从您计算机上的终端，导航到保存 SSH 密钥对 *DJBlockchain* 的目录。下面给出了一个示例位置。

    ![下载位置示例。](images/DownloadDirectory.png)


17. 通过输入 `chmod 600 DJBlockchain.pem` 来修改您的私钥的权限。

    ![修改权限。](images/SSHKeyPermissions.png)

18. 从您的 *DJBlockchain.pem SSH* 密钥对所在的位置，输入命令 `ssh -i DJBlockchain.pem linux1@xxx.xxx.x.x`，其中 x 对应于您的 Linux 虚拟机 IP。

19. **键入** `yes` 来继续完成连接提示，然后**按下** *Enter* 键。

    ![键入 yes。](images/ContinueConnecting.png)

20. 您现在已连接到您的 IBM LinuxONE Community Cloud 虚拟机！

    ![大功告成！](images/CommunityCloudWelcome.png)

    #### 针对 Hyperledger Fabric 和 Hyperledger Composer 设置您的 Linux 虚拟机

21. 现在是时候来设置您的虚拟机了！运行以下命令，将设置脚本从 Github 存储库移动到您的 Linux 虚拟机中。

    `wget https://raw.githubusercontent.com/IBM/HyperledgerFabric-on-LinuxOne/master/Linux1BlockchainScript.sh`

    ![导入脚本。](images/WgetSetup.png)

22. 输入 `ls` 来确认该文件位于您的目录中。 

    ![查看脚本。](images/Linux1Script.png)

23. 要让该文件可执行，请运行 `chmod u+x Linux1BlockchainScript.sh`，然后运行 `ls` 确保它显示为可执行文件。

    ![让该文件可执行。](images/Linux1ScriptExecutable.png)

24. 您已准备好运行设置脚本！使用以下命令运行该脚本：`./Linux1BlockchainScript.sh`。请耐心等待。这会花点时间！

![运行设置脚本。](images/RunSetupScript.png)

25. 首次运行该脚本时，会设置一些权限和环境变量，您需要退出并再次登录会话。 

    * **键入** `exit` 来退出会话。 

    * 再次**登录** -  `ssh -i DJBlockchain.pem linux1@xxx.xxx.x.x`，其中 x 对应于您的 Linux 虚拟机 IP。

    * 再次**运行**该脚本 -  `./Linux1BlockchainScript.sh`

```
      linux1@djblockchain:~> ./Linux1BlockchainScript.sh 
      ID linux1 was not a member of the docker group.This has been corrected.
      PATH was missing '/data/npm/bin'.This has been corrected.
      Some changes have been made that require you to log out and log back in.
      Please do this now and then re-run this script.
```
26. 命令行返回结果时，表明运行已完成。它看起来类似于下图。

![设置脚本已运行完成。](images/SetupScriptDone.png)

27. 要让该脚本执行的一些更改生效，可键入 `exit` 退出 ssh 会话。

![退出会话。](images/ExitSession.png)

28. 登录回您的虚拟机。`ssh -i DJBlockchain.pem linux1@xxx.xxx.x.x`，其中 x 是您的虚拟机的 IP 地址值。（如果需要帮助查找该值，请参阅第 15 步。）

![登录回您的虚拟机。](images/ReLogin.png)

#### 验证 Hyperledger Fabric 和 Hyperledger Composer 的安装

29. 要查看您的区块链网络是否正常运行，可使用命令 `docker ps -a`。您会看到 4 个容器，它们包含的镜像名称类似于下图。

![运行 fabric 容器。](images/RunningFabricContainers.png)

30. 输入 `composer -v` 验证 Composer 命令行接口和其他工具已安装。

![验证 Composer 工具的安装。](images/VerifyComposerCLI.png)

31. 使用 `ps -ef|grep playground` 命令查找 Composer Playground 的进程，以验证它正在运行。 

![验证 Composer Playground 正在运行。](images/VerifyComposerPlaygroundRunning.png)

32. 打开浏览器并将 `xxx.xxx.x.x:8080` 输入到地址栏中，其中 x 对应于您的 Linux 虚拟机的 IP 地址。 

    * **备注：**推荐使用 Chrome 作为 Hyperledger Composer Playground 的浏览器。另外推荐在匿名窗口中打开 Playground。这样，如果开始注意到怪异的行为，就可以快速清除缓存和历史记录。
    * **备注：**如果使用 Firefox，无法在 Private 模式下使用它。 
    * 您应该会看到以下信息：

![正在加载 Composer Playground。](images/ComposerPlaygroundUI1.png)

![已加载 Composer Playground。](images/ComposerPlaygroundUI2.png)

33. 恭喜您！第 1 部分现在已完成！现在进入有趣的部分。:smiley:


### 第 2 部分 - 创建一个区块链应用程序并生成 API

#### 导入您的区块链应用程序的组件

1. 在计算机上的终端中，转到主目录。`cd $HOME`

2. 如果尚未安装 Git，请为您的计算机[安装 Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git_)。 

3. 安装 Git 后，运行以下命令来克隆本练习需要的材料。`git clone https://github.com/IBM/HyperledgerFabric-on-LinuxOne.git`

![克隆 GitHub 存储库](images/CloneGitHubRepo.png)

4. 要找到本练习需要的文件，可运行 `cd HyperledgerFabric-on-LinuxOne/code/`，然后运行 `ls` 来查看该目录中有哪些内容。

   ![转到代码目录。](images/MoveToCodeDir.png)

5. 输入 `pwd` 来查看您在系统上的位置。保存此信息。一些步骤中需要此信息。

   ![输入 pwd。](images/pwd.png)

6. 转到打开了 Composer Playground 的浏览器。如果已关闭它，可以将 `xxx.xxx.x.x:8080` 输入到地址栏中，在浏览器中打开它，其中 x 对应于您的 Linux 虚拟机的 IP 地址。

   * **备注：**您需要在全屏（完全展开）模式下查看浏览器，以便能够访问所有信息，防止某些屏幕上的无法滚动问题。

   ![查看 Composer Playground。](images/ComposerPlaygroundUI2.png)

7. 选择 *Connection: Web Browser* 下的 **Deploy a new business network**。
  ![选择 Deploy a new business network。](images/SelectImportReplace.png)

8. 完成 *BASIC INFORMATION*。

   * 为您的新业务网络提供一个名称：**blockchain-journery**

   * 描述您的业务网络的用途：**Creating my first blockchain network.**

     ![完成基本信息](images/basicinfo.png)

9. 向下滚动，直到看到 *Choose a Business Network Definition to start with:*，然后选择 **empty-business-network** 和 **Deploy**。
   ![单击 empty-business-network 和 Deploy。](images/EmptyBusinessNetwork.png)

10. * 从 *My Wallet* 中选择 **Connect now**，以进入您的业务网络。

![选择 Connect now。](images/ConnectNow.png)

11. 选择 **Add a File**。

    ![选择 Add a File。](images/AddFile.png)


12. 从弹出的 *Add a file* 对话框中选择 **browse**。

    ![选择 browse。](images/SelectBrowse.png)

13. 在文件资源管理器窗口中，导航到保存下载的这些文件的位置。如果需要帮助查找此位置，请参阅第 5 步。**选择** *README.md* 并**单击** *Open*。
   ![选择 README.md](images/SelectREADME.png)

14. **选择** *Add*。
   ![选择 Add。](images/AddREADME.png)

15. 在 *Current file will be replaced* 对话框中，**选择** *Replace*。

![选择 Add。](images/READMEReplace.png)

16. 让我们继续向 Composer Playground 添加文件。  **重复第 11-15 步来添加以下文件**：

* *org.acme.sample.cto* - 此文件位于 models 文件夹中。在本练习中，将使用此文件为您的资产和事务创建一个模型。还可以在此文件中创建参与者。这类似于创建一个 Java 类并定义该类中需要的内容。
* *logic.js* - 该文件位于 lib 文件夹中。这个 JavaScript 文件将成为您的应用程序的中枢。此文件中的代码是您的智能合约，它定义了事务如何被触发。这类似于 Java 方法。
* **最后添加：***permissions.acl* - 您将在这个文件中限制区块链网络中的参与者的权限。

17. 您的文件现在都已加载到 Composer Playground 中。**单击**浏览器左侧的 *Update*。 

   ![单击 Deploy。](images/InitialDeploy.png)

   #### 创建您的区块链应用程序

18. 单击 **Model File**。

    ![单击 Model File](images/SelectModelFile.png)

19. 在右侧的 **editor** 中单击，以便开始编写您的模型。 

    * 备注：在实验期间**不要**修改 namespace。

      ![在 editor 中单击](images/ClickEditor.png)

20. 在一个新行上，为您的资产 `Sensor` 设置以下属性。

    * 备注：模型中使用一个小写的 "o" 作为项目符号。

    * `o String teamID` - 这将是分配给您的团队的值。（已经分配！）

    * `o String teamName` - 这可以是任何值！构想一个合适的名称！

    * `o Double sensorTemp` - 来自 Raspberry Pi 的温度将存储在这里。

    * `o Double thermostatTemp` - 您将为恒温器创建一个温度。

    * `o String recommendation` - 将基于 `CompareWeather` 事务来填充此属性。

    * **单击** *Update* 保存更改。

      ![传感器模型](images/SensorModel.png)

21. 现在为 `SetSensorTemp` 创建您的第一个事务模型。输入以下属性：

    * `--> Sensor gauge` - 事务需要将数据放在 `Sensor` 资产中。这会传递该资产的引用，以便我们在事务的逻辑中处理该资产。

    * `o Double newSensorValue` - 将根据从用于获取温度的 NodeRed 传感器传入事务中的温度来设置该变量。

    * **单击** *Deploy* 保存更改。

      ![创建 SetSensorTemp 模型](images/SetSensorTempModel.png)

22. 构建您的 `ChangeThermostatTemp` 事务模型。添加以下属性：

    * `--> Sensor thermostat` - 事务需要将数据放入恒温器的 `Sensor` 资产中。这会传递该资产的引用，以便我们在事务的逻辑中处理该资产。

    * `o Double newThermostatValue` - 可通过它将一个新的建议值发送到事务中。在 logic 选项卡中，我们将使用此值与温度计显示的值进行比较，确定是否应调节恒温器的值。

    * **单击** *Update* 保存更改。

      ![创建 ChangeThermostatTemp 模型](images/ChangeThermostatModel.png)

23. 输入以下值来构建您的 `CompareWeather` 事务模型：

    * `--> Sensor recommend` - 事务需要将数据放入 `Sensor` 资产中。这会传递该资产的引用，以便我们在事务的逻辑中处理该资产。
    * `o Double outsideTemp` - 查看 [WeatherUnderground.com API](https://www.wunderground.com/weather/api/d/docs?d=data/conditions) 中的条件，可以看到该调用可能返回的所有可能数据。基于该数据，决定根据室外实际温度和体感温度来推荐恒温器设置。此变量存储通过 NodeRed 从 Weather.com 传给它的室外温度值。  API 页面上的模型显示了返回的数据是摄氏度还是华氏度，以及它的变量类型。在本练习中，我们将使用摄氏度。

    * `o Double feelsLike` - 此变量存储来自 Weather.com 的 feels_like 值。

    * **单击** *Update* 保存更改。

      ![创建 CompareWeather 模型](images/CompareWeatherModel.png)

24. 单击 **Script File** 选项卡。


![单击 Script File](images/ClickScriptFile.png)



26. **在编辑器中检查代码。**验证您的变量名与此处的变量名相匹配。  大小写很重要！如果名称不匹配，则会发生错误。 

    * 是否在猜测该代码对每个事务执行何种操作？

      ![检查代码](images/ReviewScriptFile.png)

    #### 测试应用程序代码

27. 单击顶部的 **Test** 选项卡来测试您的代码。

![单击 Test](images/ClickTest.png)

28. 请注意，在这个特定案例中，因为没有参与者，所以 **Test** 选项卡打开了左侧的 **Asset** 菜单。必须拥有资产才能执行任何事务。

    * 单击 **Create New Asset**。

      ![单击 Create New Asset](images/CreateNewAsset.png)

29. 填写以下信息，创建一个示例资产来测试您的代码：

   * `"teamID": "teamID:**xxx**"`，其中** **xxx** **是您喜欢的任何团队编号。

   * `"teamName":""` - 该名称可以是您喜欢的任何名称。请提供合适的名称！:bowtie:

   * `"sensorTemp": **0**` - 将** **0** **更改为任何值。使用 NodeRed 时，温度将为摄氏度。

   * `"thermostatTemp": **0**` - 将** **0** **更改为任何值。这会初始化您的恒温器，以便挑选您想使用的值。

   * `"recommendation": ""` - 将此值保留原样。

   * *将您用于 `sensorTemp` 和 `thermostatTemp` 的值记录在某处**。

     ![创建资产](images/NewAssetValues.png)

30. 单击 **Create New**。

   ![单击 Create New](images/ClickCreateNew.png)

31. 创建您的 **Team** 资产后，它应该显示在注册表中，如下图所示。

    ![资产注册表](images/Team01Asset.png)

32. 您已准备好执行您的第一个事务。**单击** *Submit Transaction*。

    ![单击 Submit Transaction](images/ClickSubmitTransaction.png)

33. **Submit Transaction** 对话框将打开一个新窗口。 

    * 确保将 **Transaction Type** 设置为 `SetSensorTemp`。

    * 修改 JSON 数据 `"gauge": "resource:org.acme.sample.Sensor#xxxx"` - 输入您的团队的标识符代替样本 JSON 数据中的 **xxxx**。

    * 修改 JSON 数据 `"newSensorValue": 0` - 输入您的传感器可能产生的值。

    * 单击 **Submit**。

      ![提交 SetSensorTemp](images/SetSensorTempTran.png)

34. 如果您使用正确的团队 ID 提交了该事务，那么 *All Transactions* 下应该会显示一个事务。单击 **view record** 查看上一步中输入的数据。恭喜！您现在已完成一个事务。:thumbsup:

    ![事务注册表](images/TransactionRegistry.png)

35. 验证 `SetSensorTemp` 更新了您的资产中的 `sensorTemp` 值。单击 **Sensor**。

    ![单击 Team](images/ClickSensor.png)

36. 检查 `sensorTemp` 值。它是否拥有来自 `SetSensorTemp` 事务的新值？

    ![检查 sensorTemp 值](images/VerifySensorTemp.png)

37. 让我们执行另一个事务。选择 **Submit Transaction**。

    ![选择 Submit Transaction](images/SubmitTransaction2.png)

38. 这一次让我们运行 `ChangeThermostatTemp`。 

   * 在 **Transaction Type** 下拉列表中，选择 `ChangeThermostatTemp`。
     ![选择 ChangeThermostatTemp](images/SelectChangeThermostat.png)

   * 编辑事务 `"thermostat": "resource:org.acme.sample.Sensor#xxxx"` - 将 **xxxx** 更改为您的团队 ID 值。

   * 编辑事务 `"newThermostatValue": 0` 的样本 JSON 数据 - 将 **0** 替换为您能调节恒温器时希望看到的值。

   * 单击 **Submit**。

     ![提交 ChangeThermostatTemp](images/ChangeThermostatTran.png)

   * 如果您为恒温器选择了一个不在 `sensorTemp` 值的上下 3 度范围内的值，您将获得一条类似下图的错误消息。如果获得此消息，可输入另一个值并单击 Submit。

     ![ChangeThermostatTemp 错误消息](images/ChangeThermostatError.png)

   * 如果您有调节恒温器的权限，您将返回到事务注册表，可以在这里看到您刚提交的数据。

     ![事务成功](images/TransactionRegistry2.png)

   * 如果出于某种原因，您忘记修改 teamID 值或将它更新成了错误的值，就会看到类似下图的错误。检查 teamID 值并再试一次。

     ![表明资产不存在的错误消息](images/TeamIDError.png)

39. 验证上一次事务更新了您的资产。单击 **Sensor**。

    ![单击 Sensor](images/ClickSensor2.png)

40. 验证您的团队的 `thermostatTemp` 属性已更新为您在 `ChangeThermostatTemp` 事务中成功提供的值。

    * **备注：**在第 40 步，可以验证恒温器最初设置为 20，现在设置为 16。

      ![验证 thermostatTemp 值](images/VerifyThermostatTemp.png)

41. 是处理 `CompareWeather` 事务的时候了。单击 **Submit Transaction**。

    ![单击 Submit Transaction](images/SubmitTransaction3.png)

42. 从 *Transaction Type* 下拉列表中选择 **CompareWeather**。

    ![选择 CompareWeather](images/Part1_Step36.png)

43. 完成 **CompareWeather** 事务。

    * 修改 JSON 数据 "recommend": "resource:org.acme.sample.Sensor#xxxx" - 将 **xxxx** 替换为您的团队 ID。

    * 修改 JSON 数据 `"outsideTemp": 0` - 输入一个值作为室外温度。

    * 编辑 JSON 数据 `"feelsLike": 0` - 输入一个值作为可以在室外感受到的温度。

    * 单击 **Submit**。

      ![完成 CompareWeather](images/CompareWeatherTran.png)

44. 验证您的事务已显示在事务注册表中。

    ![事务注册表](images/TransactionRegistry3.png)

45. 单击 **Sensor**。 

    ![单击 Sensor](images/ClickSensor3.png)

46. 验证您的团队资产中的 `recommendation` 变量中现在有一条消息，而且 `thermostatValue` 已更新为推荐的值。

    ![团队资产推荐值](images/VerifyRecommendation.png)

47. 继续针对所有场景测试您的代码，了解您的合约能做什么。下面给出了针对剩余场景的提示：（您需要查看 Define 选项卡下的 Script File 来确定条件。）

    * ChangeThemostatTemp：
      - [ ] 一次成功事务，在该事务中，已在 Sensor 资产中更新了 `thermostatValue`。
      - [ ] *Submit Transaction* 窗口中的一条错误消息表明，您没有调节恒温器的权限。
    * CompareWeather：
      - [ ] 一个基于 `outsideTemp` 值的事务，其中的温度很高。
      - [ ] 一个基于 `outsideTemp` 值的事务，其中的温度适中。
      - [ ] 一个基于 `outsideTemp` 值的事务，其中的温度很低。
      - [ ] 一个基于 `feelsLike` 值的事务，其中的温度很高。
      - [ ] 一个基于 `feelsLike` 值的事务，其中的温度适中。
      - [ ] 一个基于 `feelsLike` 值的事务，其中的温度很低。

    * **备注：**像之前的步骤中所做的一样，您应该验证您的资产值在每次事务后已适当更新。


#### 将应用程序部署到 Hyperledger Fabric

48. 返回到运行 Hyperledger Composer Playground 的浏览器中，**单击** *Define* 选项卡，然后**单击** *Export* 将代码保存到桌面。这是一种安全措施。导出我们在第 2 部分开头部分导入的所有文件，将它们保存到一个称为业务网络归档文件 (.bna) 的压缩文件中。
   ![单击 Export](images/ClickExport.png)

49. 在弹出的对话框中，**选择**您的目录位置并**单击** *Save*。
   ![单击 Save File。](images/SaveFile2.png)

50. 在浏览器的右上角，**选择** *admin* 并**单击** *My Business Networks*。
   ![选择 admin 和 logout。](images/ClickLogout.png)

51.  在页面中部，**单击** *Connection: hlfv1* 业务网络下的 *Deploy a new business network*。

   ![选择 Create ID card。](images/DeployNetwork.png)

52. 完成 *Basic Information* 下的字段，然后**单击** *Drop here to upload or browse*。

    * Business Network：`hlfv1-blockchain-journey`
    * Description："Blockchain Journey network deployed to hlfv1"
    * Network Admin Card：`admin@hlfv1-blockchain-journey`

    ![选择 Hyperledger Fabric v1.0。](images/DeployToHLFV1.png)

53. 导航到您在第 49 步中保存 blockchain-journey.bna 的位置。从其目录中**选择** blockchain-journey.bna 并**单击** *Open*。

    ![将这些信息输入到 Composer Playground 配置文件中。](images/OpenBlockchainJourney.png)

54. 滚动到页面底部并完成以下操作： 

    * **选择** *ID and Secret*。
    * **创建** *Enrollment ID* `admin`。
    * **创建** *Enrollment Secret* `adminpw`。
    * 备注：如果创建一个不同的 *Enrollment Id* 和 *Enrollment Secret*，则需要为该 ID 创建并导入一个网络卡。参阅 [Hyperledger Composer 文档了解更多信息。](https://hyperledger.github.io/composer//reference/composer.card.create)

    ![创建 ID 卡的凭证。](images/IDCardCreds.png)

55. 上滚到顶部并**单击**右侧的 *Deploy*。 

    ![单击 Deploy a new business network。](images/ClickDeploy2.png)

56. 在 *Connection: hlfv1* 下，找到您新部署的网络 *hlfv1-blockchain-journey*。**单击** *Connect now*。

    ![填入值。](images/journeydeploy.png)

57. 返回到终端，输入 `docker ps -a`。可以看到现在有一个新容器正在运行，其中 Composer Playground 已将代码部署到 Hyperledger Fabric.

    ![查看 Hyperledger Composer Playground 容器。](images/PlaygroundContainer.png)

58. 恭喜您！您已将第一个区块链应用程序部署到 Hyperledger Fabric。

    #### 生成 API

63. 在终端中，发出以下命令来启动 API Rest 服务器：

    *  `mkdir /data/linux1/playground`

    * `nohup composer-rest-server -c admin@hlfv1-blockchain-journey -n always -w true >/data/linux1/playground/rest.stdout 2>/data/linux1/playground/rest.stderr & disown`

      ![启动您的 API Rest 服务器。](images/StartRestServer.png)

64. 验证 Rest 服务器进程正在运行。`ps -ef|grep rest`

    ![验证 Rest 服务器正在运行。](images/VerifyRestServer.png)

65. 要查看您的 API，请返回到浏览器，打开一个新的选项卡或窗口。在地址栏，输入 `http://xxx.xxx.x.x:3000/explorer`，其中 x 是您的 Linux 虚拟机的 IP 地址。您会看到一个类似下图的页面。

    ![查看您的 REST API。](images/RestAPI.png)

66. 展开不同的方法，以查看可通过 REST API 执行的各种调用和参数。也可以在此浏览器中测试该 API，了解如何生成该 API 并查看响应。

    ![测试您的 API。](images/TestAPI.png)

67. 恭喜您！您现在已有一个工作正常的区块链应用程序，并且创建了 API 来调用您的区块链应用程序。



### 第 3 部分 - 通过 NodeRED 调用区块链 API 



#### 将您的流导入 NodeRED 中
1. 在浏览器的一个新选项卡或窗口中打开 NodeRED。在地址栏中输入 `http://xxx.xxx.x.x:1880`，其中 x 对应于您的 Linux 虚拟机 IP 地址。

   * 备注：您可能需要对 Node-RED 使用 Chrome 以外的浏览器。Chrome 中断断续续地出现了一些 Node-RED 加载问题。

   ![打开 NodeRED。](images/OpenNodeRED.png)

2. 您需要向 NodeRED 面板添加更多节点，才能拥有完整的工作流。为此，**选择**右上角的 *menu* 按钮。

   ![选择 menu 图标。](images/node-red-menu.png)

3. 从下拉菜单中**选择** *Manage Palette*。

   ![选择 Manage Palette。](images/ManagePalette.png)

4. 在 *User Settings* 窗口中，**单击** *Install*，在搜索栏中**键入** `dashboard`，然后选择 *node-red-dashboard* 旁边的 **Install**。

   ![安装 node-red-dashboard 节点。](images/install-node-red-dashboard.png)

5. 在 *Install nodes* 弹出窗口中，**单击** *Install*。

   ![单击 Install。](images/install.png)

6. 现在是安装 RaspberryPi Sense Hat 模拟器的时候了。在 *User Settings* 窗口中的 *Install* 下，在搜索栏中**键入** `sense`，然后选择 *node-red-pi-sense-hat-simulator* 旁边的 **Install**。

   ![安装 Raspberry Pi Sense Hat Simulator 节点。](images/PiNodes.png)

7. 在 *Install nodes* 弹出窗口中，**单击** *Install*。

   ![单击 Install。](images/install.png)

8. 要添加另一个节点，请在搜索对话框中**输入** *weather*，并**选择** *node-red-node-weather-underground* 旁边的 *install*。

   ![安装 weather underground 节点。](images/weatherinstall.png)

9. 在 *Install nodes* 弹出窗口中，**单击** *Install*。

   ![单击 Install。](images/install.png)

10. **单击** *Close* 退出 User Settings 对话框。

 ![单击 Close。](images/closePalette.png)

9. 从 [GitHub 存储库](https://raw.githubusercontent.com/IBM/HyperledgerFabric-on-LinuxOne/master/code/node-red.json) **复制**所有 JSON 文件以导入该流中。 

    - **备注：**实现此目的的最简单方法是单击上面的超链接。也可以在 GitHub 存储库中的 code 文件夹中找到它，名为 `node-red.json`。要在 GitHub 中查看它，请**单击** *node-red.json*，**选择** *raw*，然后复制它。 

![复制原始 JSON。](images/RawJson.png)

10. **单击**右上角的 *menu 图标*，将它粘贴到 NodeRed 中。

![menu](images/node-red-menu.png)

11.  **选择** *Import -> Clipboard*。

![menu](images/node-red-menu-import-clipboard.png)

12.  将该代码**粘贴**到编辑器中。确保**选择**了“current flow”按钮。**选择** *Import*。

![导入编辑器中](images/node-red-menu-import-editor.png)

13.  现在，NodeRED 中应该有 3 个流 - Blockchain、Dashboard 和 Gauge。

![3 个 NodeRED 流。](images/ThreeFlows.png)

14. 在 Node-RED 浏览器的右侧，**单击** *Deploy* 保存您导入的工作。

![单击 Deploy。](images/ClickDeploy.png)



#### 通过仪表板与区块链进行交互

15. **单击**右上角的 *Deploy* 下的 *dashboard* 选项卡。

    ![单击 dashboard。](images/ClickDashboard.png)

16. **单击** *pop out* 按钮在浏览器中打开仪表板。

    ![单击 pop out 按钮。](images/ClickPopOut.png)

17. 这会打开一个新的选项卡。您的仪表板应该类似于下图。

    ![仪表板图。](images/Dashboard.png)

18. 要与模拟的 RaspberryPi 进行交互，返回到您的 Node-RED 选项卡并**选择** *Gauge Simulator* 选项卡。

    ![选择 Gauge Simulator 选项卡。](images/GaugeSimulator.png)

19. **单击** *Sensor Gauge Simulator* 节点。

    ![单击 Sensor Gauge Simulator 节点。](images/GaugeNode.png)

20. 在浏览器的右侧，**单击** *Info* 选项卡。

    ![单击 Info。](images/ClickInfo.png)

21. 在 Information 下的第 3 段中，单词 *here* 包含一个超链接。  该超链接会在一个新的选项卡中打开模拟器。**单击** *here*。

    ![单击 here。](images/ClickHere.png)

22. 在模拟器中将传感器的温度从 20 C **调节**为其他值。

    ![调节传感器温度。](images/Sensor.png)

23. 切换回您的仪表板的选项卡，**单击** *Get Sense Hat Temperature* 来查看传感器温度和图表的变化。

    ![注意仪表板中的传感器差异。](images/SensorDashboard.png)

24. 继续使用仪表板通过 API 与区块链进行交互。可以尝试以下操作：

    * 键入一个团队名称并单击 *Add Team Name*。您随后会看到一条成功消息。

      ![add team 按钮](images/dashboard-add-team-button.png)

      â€‹

    * 通过滑动 *Thermostat Value* 旁边的滑块来更改恒温器温度。单击 *Change Thermostat* 将该值发送到区块链。’

      ![thermo 滑块](images/dashboard-thermo-slider.png)’

      ![change thermo 按钮](images/dashboard-changethermo-button.png)

    * 键入一个州和城市，以查找室外温度。单击 *Get Current Temps* 获取温度值。

      ![输入一个州和城市。选择 Get Current Temps。](images/OutsideTemps.png)

    * 拥有室外温度后，可以单击 *Get Recommendation* 来查找恒温器的理想温度。请注意，这会在仪表板中调节恒温器。

    * ![推荐结果](images/dashboard-recommendation-result.png)

25. 恭喜您！您已完成本次 Code Pattern！
