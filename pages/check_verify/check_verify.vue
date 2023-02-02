<template>
	<view class='container'>
		<view class="info flex_r_s">
			<view class="title">类型</view>
			<view class="title-content flex_r_e">
				<view class="chose-content">{{(detail.type==0&&'点检')||(detail.type==1&&'巡检')||''}}</view>
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title">场景</view>
			<view class="title-content flex_r_e">
				<view class="chose-content">设备检查</view>
			</view>
		</view>
		<view v-if="detail.process" class="info flex_r_b">
			<view class="title ">流程说明</view>
			<view class='title-content-input'>
				{{detail.process}}
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">优先级</view>
			<view class="title-content flex_r_e">
				<view class="chose-content">{{(detail.priority==0&&'正常')||(detail.priority==1&&'重要')||(detail.priority==2&&'紧急重要')}}</view>
			</view>
		</view>
		<view class="info flex_c_s_s">
			<view class="flex_r_s" style="margin-top: 55rpx; margin-bottom: 55rpx;">
				<view class="title">检查周期</view>
				<view class="title-content flex_r_e">
					<view class="chose-content">{{(detail.isCycle&&'周期性')||'临时性'}}</view>
				</view>
			</view>
			<view v-if="detail.isCycle" class="flex_r_s" style="margin-bottom:41rpx;">
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 31rpx;">周期单位</view>
				<view class='cycle'>
					<view class='flex_c_c' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<view style="min-width: 50rpx;text-align: center; color: #626262;">{{detail.unit}}</view>
					</view>
				</view>
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 106rpx;">周期次数</view>
				<view class='cycle'>
					<view class='flex_r_b' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<view style="width: 50rpx;text-align: right; color: #626262;">{{detail.num}}</view>
						<view style="margin-right: 10rpx;">次</view>
					</view>
				</view>
			</view>
			<view v-if="detail.isCycle" v-for="(item,index) in detail.time" :key='index' class="flex_r_s" style="margin:0rpx 0rpx 41rpx 0rpx;">
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 31rpx;">开始时间</view>
				<view class='date'>
					<view class='flex_r_b' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<view class='flex_r_b' style="width: 340rpx;text-align: center; color: #626262;">
							<view style="margin-left: 20rpx;">{{item.date}}</view>
							<view style="margin-right: 20rpx;">{{item.time}}</view>
						</view>
						<image style="width: 20rpx;height: 12rpx;margin-right: 10rpx;" src="../../static/check/down_arrow.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">下发人</view>
			<view class="title-content flex_r_e">
				<view class='line1' style="text-align: right; width: 400rpx; color: #626262;">{{detail.createdUserName}}</view>
			</view>
		</view>
		<view class="info flex_c_c">
			<view class="flex_r_b" style="width: 100%;">
				<view class="title ">执行时效</view>
				<view style="margin-right: 38rpx;color:#626262;font-size: 28rpx;">{{detail['aging']}}小时</view>
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">执行人</view>
			<view class="title-content flex_r_e">
				<view class='line1' style="text-align: right; width: 400rpx; color: #626262;">{{detail.executor}}</view>
			</view>
		</view>
		<view v-if="detail.assist" class="info flex_r_s">
			<view class="title ">协助人</view>
			<view class="title-content flex_r_e">
				<view class='line1' style="text-align: right; width: 400rpx; color: #626262;">{{detail.assist}}</view>
			</view>
		</view>
		<view v-if="detail.cc" class="info flex_r_s">
			<view class="title ">抄送人</view>
			<view class="title-content flex_r_e">
				<view class='line1' style="text-align: right; width: 400rpx; color: #626262;">{{detail.cc}}</view>
			</view>
		</view>
		<view v-if="detail.desc" class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">问题描述</view>
			<view class="question-content flex_c_c">
				<view class='question-content-input'>
					{{detail.desc}}
				</view>
			</view>
		</view>
		<!--外层 图片/视频/音频 选择 -->
		<view v-if="detail.image[0]||detail.video||detail.voice" class="info flex_c_s_s">
			<view class="title" style="margin: 65rpx 0 39rpx 31rpx ">附件</view>
			<view class="upload flex_r_a">	
				<view v-for="(item,index) in detail.image" :key='index' class='upload-img' @click="previewImage(index)">
					<image class='page_img' :src="IMAGE_URL+'/'+item" mode="aspectFill"></image>
				</view>
			</view>
			<view v-if="detail.image[0]" style="margin: 31rpx 0 31rpx 50rpx;color: #626262; font-size: 27rpx;">图片描述</view>
			<!-- 视频/音频 -->
			<view class="upload flex_r_b">
				<view v-if="detail.video" class='upload-video flex_c_c' @click="toWebView(detail.video)">
					<image class='video' src="../../static/video.png" mode="aspectFit"></image>
					<view style="color: #626262; font-size: 27rpx; margin-top: 31rpx;">视频描述</view>
				</view>
				<view v-if="detail.voice" class='upload-video flex_c_c' @click="playVoice(detail.voice)">
					<image style="width:100%;height:150rpx;" src="../../static/voice.png" mode="aspectFill"></image>
					<view style="color: #626262; font-size: 27rpx;margin-top: 31rpx;">点击播放/暂停</view>
				</view>
			</view>
		</view>
		<view class="info flex_c_s">
			<view class="flex_r_b" style="width: 100%;margin: 80rpx 0 35rpx;">
				<view class="title ">{{detail.type==0?'点检项目':'巡检项目'}}</view>
				<view class="flex_r_s">
					<view v-if="detail.taskInfo&&!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" class='verify-btn' @click="open">批量选择审批人</view>
				</view>
			</view>
			<!-- 点检或巡检项目 -->
			<view v-for="(item,index) in detail.components" :key="index" style="width: 100%;">
				<view class="flex_r_b" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
					<view style="margin-left: 31rpx;font-size: 27rpx;color: #626262;">系统名称: {{item.systemName}}</view>
					<view src="" mode="aspectFit" style=" margin:41rpx 38rpx 41rpx 0;width: 40rpx;height:40rpx;"></view>
				</view>
				<view v-for="(itm,idx) in item.device" :key="idx">
					<view class="flex_r_b" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
						<view style="margin:41rpx 38rpx 41rpx 50rpx;font-size: 27rpx;color: #626262;">设备名称: {{itm.parentName}}</view>
					</view>

					<view v-for="(itm1,idx1) in itm.child" :key='idx1' class="flex_c_s" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
						<view style="width: 600rpx; margin:41rpx 0;font-size: 27rpx;color: #626262;" @click="toDetail(itm1.id)">
							({{idx1+1}}) {{detail.type==0?'点检项目':'巡检项目'}}: {{itm1.name}} <text style="color: #007AFF;" @click.stop="showChildDetail(itm1.taskComponentId)">{{(showChild[itm1.taskComponentId]?'(点击展开)':'(点击收起)')||''}}</text>
						</view>
						<!-- 是否收缩 -->
						<view v-if="!showChild[itm1.taskComponentId]">
							<!-- 选择检查情况 -->
							<view class="flex_r_s_s" style="width: 600rpx;margin: 30rpx 0 35rpx;">
								<view class="title" style="margin-left: 0rpx;">{{detail.type==0?'点检情况':'巡检情况'}}</view>
								<!-- 只有未完成且执行人才能操作 -->
								<view v-if="detail.taskInfo&&!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" class="flex_c_s_s" style="width: 420rpx;">
									<view class="flex_r_s_s">
										<view class='flex_r_s' @click="checkEvent(itm1.taskComponentId,0)">
											<image class='chose-icon' :src="checkInfo[itm1.taskComponentId]==0?'../../static/check/select.png':'../../static/check/unselect.png'"
											 mode="aspectFill"></image>
											<view :class="[checkInfo[itm1.taskComponentId]==0?'font-color':'un-font-color']" class="chose-content">正常</view>
										</view>
										<view class='flex_r_s' style="margin-left: 100rpx;" @click="checkEvent(itm1.taskComponentId,1)">
											<image class='chose-icon' :src="checkInfo[itm1.taskComponentId]==1?'../../static/check/select.png':'../../static/check/unselect.png'"
											 mode="aspectFill"></image>
											<view :class="[checkInfo[itm1.taskComponentId]==1?'font-color':'un-font-color']" class="chose-content">自行解决</view>
										</view>
									</view>
									<view class='flex_r_s' style="margin-top: 40rpx;" @click="checkEvent(itm1.taskComponentId,2)">
										<image class='chose-icon' :src="checkInfo[itm1.taskComponentId]==2?'../../static/check/select.png':'../../static/check/unselect.png'"
										 mode="aspectFill"></image>
										<view :class="[checkInfo[itm1.taskComponentId]==2?'font-color':'un-font-color']" class="chose-content">未解决,提交求助</view>
									</view>
								</view>
								<!-- 只读情况 -->
								<view v-else class="flex_c_s_s" style="width: 420rpx;">
									<view class="flex_r_s_s">
										<view class='flex_r_s'>
											<image v-if="detail.taskInfo.isDone||itm1.info.isDone" class='chose-icon' src="../../static/check/select.png" mode="aspectFill"></image>
											<view v-if="detail.taskInfo.isDone||itm1.info.isDone" class="chose-content font-color">{{(itm1.info.result==0&&'正常')||(itm1.info.result==1&&'自行解决')||(itm1.info.result==2&&'未解决,提交求助')}}</view>
											<view v-else class="chose-content" style="color: #5786F7;">正在进行中</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 审批人 -->
							<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor&&checkInfo[itm1.taskComponentId]==2" @click="userChose('verify',itm1.taskComponentId)"
							 class='flex_r_b' style="width: 600rpx;color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
								<view class="title" style="margin-left: 0;color:#000000">审批人</view>
								<view class="title-content  flex_r_e">
									<block v-if="userChoseInfo['verify'][itm1.taskComponentId]" v-for="(itm4,idx4) in userChoseInfo['verify'][itm1.taskComponentId]"
									 :key="idx4">
										<view v-if="idx4<4" class='user-item'> {{itm4.username}}</view>
										<view v-if="idx4<4&&idx4!=userChoseInfo['verify'][itm1.taskComponentId].length-1" style="color: #5786F7;">></view>
									</block>
									<view v-if="userChoseInfo['verify'][itm1.taskComponentId]&&userChoseInfo['verify'][itm1.taskComponentId].length>4"
									 style="color: #5786F7;">...</view>
									<view v-if="!userChoseInfo['verify'][itm1.taskComponentId]||!userChoseInfo['verify'][itm1.taskComponentId][0]"
									 style="color: #626262;">请选择</view>
									<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
								</view>
							</view>
							<!-- 抄送人 -->
							<!-- 	<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor&&checkInfo[itm1.taskComponentId]==2" @click="userChose('cc',itm1.taskComponentId)"
							 class='flex_r_b' style="width: 600rpx;color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
								<view class="title" style="margin-left: 0;color:#000000">抄送人</view>
								<view class="title-content  flex_r_e">
									<view style="color: #626262;">{{userChoseInfo['cc'][itm1.taskComponentId]||'请选择'}}</view>
									<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
								</view>
							</view> -->
							<!-- 如果未完成，是执行人且选的是自行解决 -->
							<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor&&checkInfo[itm1.taskComponentId]==1" @click="userChose('assist',itm1.taskComponentId)"
							 class='flex_r_b' style="width: 600rpx;color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
								<view class="title" style="margin-left: 0;color:#000000">协助人</view>
								<view class="title-content  flex_r_e">
									<view style="color: #626262;">{{userChoseInfo['assist'][itm1.taskComponentId]||'请选择'}}</view>
									<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
								</view>
							</view>
							<!-- 只读 -->
							<view v-else-if="itm1.info.assist" class='flex_r_b' style="width: 600rpx;color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
								<view class="title" style="margin-left: 0;color:#000000">协助人</view>
								<view class="title-content  flex_r_e">
									<view style="color: #626262;">{{itm1.info.assist}}</view>
								</view>
							</view>
							<view v-if="(!detail.taskInfo.isDone&&detail.taskInfo.isExecutor)||(itm1.info.image&&itm1.info.image[0])||itm1.info.video||itm1.info.voice "
							 class="flex_r_s" style="width: 600rpx;margin: 0rpx 0 35rpx;">
								<view class="title" style="margin-left: 0rpx;">附件</view>
							</view>
							<!-- 子设备图片/视频选择 -->
							<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" class="flex_r_b" style="width: 600rpx;">
								<view v-for="(itm2,idx2) in imgList[itm1.taskComponentId]||defaultImgList" :key='idx2' class='child-upload-img'>
									<image @click="chooseImg(itm1.taskComponentId,idx2)" class='page_img' :src="itm2||'../../static/check/img_default.png'"
									 mode="aspectFill"></image>
									<image v-if="itm2" @click.stop="deleteImg(itm1.taskComponentId,idx2)" class='delete' src="../../static/check/delete.png"
									 mode="aspectFill"></image>
								</view>
							</view>
							<!-- 子设备图片信息只读 -->
							<view v-else-if="itm1.info.image&&itm1.info.image[0]" class="flex_r_a" style="width: 600rpx;">
								<view v-for="(itm2,idx2) in itm1.info.image" :key='idx2' class='child-upload-img' @click="previewImage1(index,idx,idx1,idx2)">
									<image class='page_img' :src="IMAGE_URL+'/'+itm2" mode="aspectFill"></image>
								</view>
							</view>
							<view v-if="(!detail.taskInfo.isDone&&detail.taskInfo.isExecutor)||(itm1.info.image&&itm1.info.image[0])" style="width: 600rpx;text-align: left; margin: 31rpx 0;color: #626262; font-size: 27rpx;">添加图片详细描述(可传4张)</view>
							<!-- 视频/音频 -->
							<view class="flex_r_b" style="width: 600rpx;">
								<!-- 视频编辑 -->
								<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" class='child-upload-video flex_c_s' @click="chooseVideo(itm1.taskComponentId)">
									<image v-if="!video[itm1.taskComponentId]" style="width:100%;height:150rpx;" src="../../static/check/video.png"
									 mode="aspectFill"></image>
									<video class='child-video' v-if="video[itm1.taskComponentId]" :src="video[itm1.taskComponentId]" controls></video>
									<view style="color: #626262; font-size: 27rpx; margin-top: 31rpx;">添加视频详细描述异常</view>
									<image v-if="video[itm1.taskComponentId]" @click.stop="deleteVideo(itm1.taskComponentId)" class='delete1' src="../../static/check/delete.png"
									 mode="aspectFill"></image>
								</view>
								<!-- 视频只读 -->
								<view v-else-if="itm1.info.video" class='child-upload-video flex_c_c' @click="toWebView(itm1.info.video)">
									<image class='child-video' src="../../static/video.png" mode="aspectFit"></image>
									<!-- <video class='child-video' :src="IMAGE_URL+'/'+itm1.info.video" controls></video> -->
									<view style="color: #626262; font-size: 27rpx; margin-top: 31rpx;">视频详细描述异常</view>
								</view>
								<!-- 音频编辑 -->
								<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" @click="chooseAudio(itm1.taskComponentId)"
								 class='child-upload-video flex_c_s'>
									<image style="width:100%;height:150rpx;" :src="voice[itm1.taskComponentId]?'../../static/voice.png':'../../static/check/audio.png'"
									 mode="aspectFill"></image>
									<view v-if="!voice[itm1.taskComponentId]&&!isRecording" style="color: #626262; font-size: 27rpx;margin-top: 31rpx;">
										点击录制语音(15s以内)
									</view>
									<view v-else-if="!voice[itm1.taskComponentId]&&isRecording" style="color: red; font-size: 27rpx;margin-top: 31rpx;">
										录音中({{count}} s),点击停止
									</view>
									<view v-else style="color: red; font-size: 27rpx;margin-top: 31rpx;">
										录音完成({{voice[itm1.taskComponentId].voiceTime}} s) 点击播放/暂停
									</view>
									<image v-if="voice[itm1.taskComponentId]" @click.stop="deleteVoice(itm1.taskComponentId)" class='delete1' src="../../static/check/delete.png"
									 mode="aspectFill"></image>
								</view>
								<!-- 音频只读 -->
								<view v-else-if="itm1.info.voice" class='child-upload-video flex_c_c' @click="playVoice(itm1.info.voice)">
									<image style="width:100%;height:150rpx;" src="../../static/voice.png" mode="aspectFill"></image>
									<view style="color: #626262; font-size: 27rpx;margin-top: 31rpx;">点击播放/暂停</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="detail.auditInfo&&detail.auditInfo[0]" class="info flex_c_s_s">
			<view class="flex_r_b" style="width: 100%;margin: 71rpx 0 39rpx 0rpx ">
				<view class="title" style="margin-left: 31rpx;">审核历史</view>
				<view class="flex_r_s">
					<image @click="show(1)" src="../../static/down.png" style="width: 37rpx;height: 37rpx;" mode="aspectFit"></image>
					<image @click="show(0)" src="../../static/up.png" style="width: 37rpx;height: 37rpx;margin-left: 16rpx;margin-right: 38rpx;"
					 mode="aspectFit"></image>
				</view>
			</view>
			<view v-if="showVerifyList" v-for="(item,index) in detail.auditInfo" :key='index' class="question-content flex_c_c"
			 style="background-color: #fff;margin-bottom: 20rpx;box-shadow: 0px 0px 14px 0px rgba(65, 65, 65, 0.15);">
				<view class='flex_r_b' style="width: 100%;height: 105rpx; border-bottom: 1rpx solid #E6E6E6;">
					<view style="margin-left: 39rpx;font-size: 29rpx;">审核人: {{item.reviewer}}</view>
					<view style="margin-right: 39rpx;font-size: 20rpx;color: #6D6D6D;">{{item.modifiedTime}}</view>
				</view>
				<view class='flex_c_c' style="width: 88%;height: 110rpx;font-size: 24rpx;color: #333333;">
					<view class='line1' style="width: 100%;height: 40rpx;">审批结果:<text style="color: #007AFF;">{{verifyRange[item.result]}}</text>；
						审批意见: <text style="color: #007AFF;">{{item.content||'暂无'}}</text> </view>
				</view>
			</view>
		</view>
		<!-- 修改协助人 -->
		<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" class="info flex_r_s" @click="userChose('assistUpdate')">
			<view class="title ">抄送人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{userChoseInfo['assistUpdate']||'请选择'}}</view>
				<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 执行备注 -->
		<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">执行备注</view>
			<view class="question-content flex_c_c">
				<textarea class='question-content-input' @input="executeInput" placeholder="请输入内容" value="" />
				</textarea>
			</view>
		</view>
		<!-- 执行备注只读 -->
		<view v-else-if="detail.excutePs" class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">执行备注</view>
			<view class="question-content flex_c_c">
				<view class='question-content-input'>
					{{detail.excutePs}}
				</view>
			</view>
		</view>
		<view v-if="detail.taskInfo&&detail.taskInfo.isRevoke" class="info flex_r_s">
			<view class="title ">任务状态</view>
			<view class="title-content flex_r_e">
				<view class="chose-content">已撤销</view>
			</view>
		</view>
		<view class="flex_r_c" style="margin: 54rpx 0 250rpx;">
			<!-- 如果是执行人或者是创建人 -->
			<view v-if="detail.isCycle>0&&detail.taskInfo&&detail.taskInfo.isCreatedUser" class="btn" @click="toUpdate">去修改</view>
			<!-- 执行人提交 -->
			<view v-if="(detail.taskInfo&&!detail.taskInfo.isDone)&&detail.taskInfo.isExecutor" class="btn" @click="submit">提交</view>
			<!-- 是否展示撤销 -->
			<view v-if="detail.taskInfo&&detail.taskInfo.isCreatedUser&&!detail.taskInfo.isDone" class="btn" @click="revoke">
				撤销
			</view>
			<!-- 是否暂停 -->
			<view v-if="detail.isCycle>0&&(detail.taskInfo&&detail.taskInfo.isCreatedUser)" class="btn" @click="stop(detail.isPause)">{{detail.isPause==0?'暂停':'取消暂停'}}</view>
			<!-- 是否删除 -->
			<view v-if="detail.taskInfo&&detail.taskInfo.isCreatedUser&&!detail.taskInfo.isDone" class="btn" @click="del">删除</view>
		</view>
		<modal ref="modal">
			<view class='modal-content flex_c_s ' @tap.stop='blank'>
				<scroll-view scroll-y="true" style="width: 99%;height: 500rpx;margin-top: 50rpx; border-bottom: 1rpx solid #666666;">
					<view v-for="(item,index) in batchVerifyList" :key="index" style="width: 100%;font-size: 27rpx;margin-bottom: 20rpx;">
						<view class="flex_r_s" style="width: 100%;" @click="verifySelect(index)">
							<image class='list-icon' :src="item.isSelected?'../../static/login/selected.png':'../../static/login/unselected.png'"
							 mode="aspectFill"></image>
							<view class="name line1">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>
				<!-- 审批人 -->
				<view @click="userChose('batchVerify')" class='flex_r_b' style="width: 550rpx;color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
					<view class="title" style="margin-left: 0;color:#000000">审批人</view>
					<view class="title-content  flex_r_e">
						<block v-if="userChoseInfo['batchVerify']" v-for="(itm2,idx2) in userChoseInfo['batchVerify']" :key="idx2">
							<view v-if="idx2<4" class='user-item'> {{itm2.username}}</view>
							<view v-if="idx2<4&&idx2!=userChoseInfo['batchVerify'].length-1" style="color: #5786F7;">></view>
						</block>
						<view v-if="userChoseInfo['batchVerify']&&userChoseInfo['batchVerify'].length>4" style="color: #5786F7;">...</view>
						<view v-if="!userChoseInfo['batchVerify']||!userChoseInfo['batchVerify'][0]" style="color: #626262;">请选择</view>
						<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="btn" style="margin-top: 30rpx;" @click="verifySubmit">确定</view>
			</view>
		</modal>
	</view>
</template>

<script>
	import request from '../../util/request'
	import util from '../../util/util'
	import {
		DEBUG,
		SERVER_URL,
		IMAGE_URL,
		OFFLINE_KEY
	} from '../../util/config.js'
	let app = getApp()
	let taskId = ''
	let uid = ''
	let isCreate = ''
	let checkId = ''
	let self
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	// 选择的人员完整信息
	let choseInfo = {
		cc: {},
		verify: {},
		assist: {},
		batchVerify: {}
	}
	// 子设备id
	let childDeviceId = ''
	let timer
	// 离线数据
	let offData = ''
	// 执行备注
	let excutePs = ''
	export default {
		data() {
			return {
				showVerifyList:true,
				verifyRange: ['执行', '暂缓', '忽略', '大修处理', '无法确定'], //审核结果范围
				defaultImgList: ['', '', '', ''],
				imgList: {},
				video: {},
				voice: {},
				detail: {
					image: [],
					components: [],
					taskInfo: {}
				},
				checkInfo: {},
				userChoseInfo: {
					cc: {},
					verify: {},
					assist: {},
					batchVerify: []
				}, //当前页面各类别人员选择信息
				key: '', //协助人/执行人/抄送人/审批人
				SERVER_URL,
				IMAGE_URL,
				isRecording: 0, //是否正在录音
				count: 0,
				batchVerifyList: [], //批量审批列表
				showChild: {} //子设备是否收缩
			}
		},
		onLoad(params) {
			self = this
			excutePs = ''
			offData = ''
			// 选择的人员完整信息
			choseInfo = {
				cc: {},
				verify: {},
				assist: {},
				batchVerify: {}
			}
			taskId = params.id
			uid = params.uid
			checkId = params.checkId
			isCreate = params.isCreate
			// 录音结束监听
			recorderManager.onStop(function(res) {
				DEBUG && console.log('录音临时路径' + res.tempFilePath);
				if (timer) {
					clearInterval(timer)
				}
				self.isRecording = 0
				self.voice[childDeviceId] = {
					url: res.tempFilePath
				}
				innerAudioContext.src = res.tempFilePath
				setTimeout(function() {
					self.count = innerAudioContext.duration
					// console.log(innerAudioContext.duration, self.count);
					self.voice[childDeviceId].voiceTime = innerAudioContext.duration
					self.voice = JSON.parse(JSON.stringify(self.voice))
				}, 200);
			});
			offData = JSON.parse(JSON.stringify(app.globalData.offlineInfo))
			app.globalData.offlineInfo = null
			// 如果有离线数据
			if (offData) {
				DEBUG && console.log('有离线数据', offData);
				if (offData.imgList) {
					this.imgList = offData.imgList
				}
				if (offData.voice) {
					this.voice = offData.voice
				}
				if (offData.video) {
					this.video = offData.video
				}
				this.checkInfo = offData.checkInfo
				choseInfo = offData.choseInfo
				this.userChoseInfo = offData.userChoseInfo
			}
			this.getTaskDetail()
		},
		onUnload() {
			if (innerAudioContext.src) {
				// 已经暂停
				if (!innerAudioContext.paused) {
					// 暂停
					innerAudioContext.pause();
				}
			}
			// 清空选择数据
			app.globalData.userChoseInfo = {}
		},
		onShow() {
			DEBUG && console.log('全局选择', app.globalData.userChoseInfo);
			// 当前选择的人员类型
			if (childDeviceId && app.globalData.userChoseInfo[this.key] && app.globalData.userChoseInfo[this.key][childDeviceId]) {
				choseInfo[this.key][childDeviceId] = app.globalData.userChoseInfo[this.key][childDeviceId].choseInfo || {}
				if (Object.values(choseInfo[this.key][childDeviceId]).length > 0) {
					if (this.key != 'verify') {
						this.userChoseInfo[this.key][childDeviceId] = Object.values(choseInfo[this.key][childDeviceId]).map(item => {
							return item.username
						}).join('、')
					} else {
						this.userChoseInfo[this.key][childDeviceId] = Object.values(choseInfo[this.key][childDeviceId])
					}
				} else if (this.key == 'verify') {
					this.userChoseInfo[this.key][childDeviceId] = []
				} else {
					this.userChoseInfo[this.key][childDeviceId] = ''
				}
				this.userChoseInfo = JSON.parse(JSON.stringify(this.userChoseInfo))
				DEBUG && console.log('选择数据', choseInfo, this.userChoseInfo);
			} else if (!childDeviceId && app.globalData.userChoseInfo[this.key]) {
				choseInfo[this.key] = app.globalData.userChoseInfo[this.key].choseInfo || {}
				if (Object.values(choseInfo[this.key]).length > 0) {
					if (this.key == 'assistUpdate') {
						this.userChoseInfo[this.key] = Object.values(choseInfo[this.key]).map(item => {
							return item.username
						}).join('、')
					} else {
						this.userChoseInfo[this.key] = Object.values(choseInfo[this.key])
					}
				}
				this.userChoseInfo = JSON.parse(JSON.stringify(this.userChoseInfo))
			}
		},
		// 到底了
		onReachBottom() {

		},
		// 分享
		// #ifdef MP-WEIXIN
		onShareAppMessage() {},
		// #endif
		// 页面滚动
		onPageScroll() {

		},
		methods: {
			// 是否显示审批历史
			show(idx) {
				if (idx != this.showVerifyList) {
					this.showVerifyList = idx
				}
			},
			toWebView(url) {
				console.log(url);
				util.navigate('/pages/video_play/video_play', {
					url
				})
			},
			// 去修改
			toUpdate() {
				app.globalData.detailInfo = this.detail
				this.detail.components.forEach((item, index) => {
					item.device.forEach(itm => {
						app.globalData.deviceInfo[item.system] = {
							system: item.system,
							systemName: item.systemName,
							device: {
								[itm.parent]: itm
							}
						}
					})

				})
				util.navigate('/pages/spot_check/spot_check')
			},
			// 部件详情
			toDetail(id) {
				DEBUG && console.log('项目id', id);
				app.globalData.isPoint = this.detail.type
				util.navigate('/pages/element_detail/element_detail', {
					componentId: id
				})
			},
			executeInput(e) {
				excutePs = e.detail.value || ''
			},
			// 是否显示子设备详细详细
			showChildDetail(id) {
				this.showChild[id] = !this.showChild[id]
				this.showChild = JSON.parse(JSON.stringify(this.showChild))
			},
			// 批量选择确定
			verifySubmit() {
				if (this.batchVerifyList[0]) {
					this.batchVerifyList.forEach((item, index) => {
						if (item.isSelected) {
							// 如果选择了审批人再执行
							if (choseInfo[this.key]) {
								if (app.globalData.userChoseInfo['verify']) {
									app.globalData.userChoseInfo['verify'][item.taskId] = {
										choseInfo: choseInfo[this.key]
									}
								} else {
									app.globalData.userChoseInfo['verify'] = {
										[item.taskId]: {
											choseInfo: choseInfo[this.key]
										}
									}
								}
								choseInfo['verify'][item.taskId] = choseInfo[this.key]
								this.userChoseInfo['verify'][item.taskId] = this.userChoseInfo[this.key]
							}

						}
					})
					this.userChoseInfo = JSON.parse(JSON.stringify(this.userChoseInfo))
				}
				this.$refs.modal.close()
			},
			// 审批人员批量选择
			verifySelect(idx) {
				this.batchVerifyList[idx].isSelected = !this.batchVerifyList[idx].isSelected
			},
			// 打开弹窗
			open() {
				this.key = 'batchVerify'
				delete this.userChoseInfo[this.key]
				delete choseInfo[this.key]
				delete app.globalData.userChoseInfo[this.key]
				let list = []
				// 生成批量审批人列表
				this.detail.components.forEach((item, index) => {
					item.device.forEach((itm, idx) => {
						itm.child.forEach((itm1, idx1) => {
							let data = this.userChoseInfo['verify'][itm1.taskComponentId || itm1.id]
							let result = this.checkInfo[itm1.taskComponentId || itm1.id]
							DEBUG && console.log('选择的执行结果', this.checkInfo, result, this.userChoseInfo['verify']);
							if (!data || (data && data.length == 0)) {
								if (result == 2) {
									list.push({
										name: itm1.name,
										taskId: itm1.taskComponentId || itm1.id,
										isSelected: false
									})
								}
							}
						})
					})
				})
				if (list.length == 0) {
					util.showTips('无可选择设备', 4)
					return
				}
				// 批量审批人列表
				this.batchVerifyList = JSON.parse(JSON.stringify(list))
				DEBUG && console.log('批量审批人列表', this.batchVerifyList);
				this.$refs.modal.open()
			},
			blank() {},
			// 播放语音
			playVoice(src) {
				let url = IMAGE_URL + '/' + src
				if (innerAudioContext.src == url) {
					// 已经暂停
					if (innerAudioContext.paused) {
						DEBUG && console.log('播放');
						// 播放
						innerAudioContext.play();
					} else {
						DEBUG && console.log('暂停');
						// 暂停
						innerAudioContext.pause();
					}
				} else {
					innerAudioContext.src = url
					innerAudioContext.play();
				}
			},
			// 撤销任务
			async revoke() {
				let res = await request.post(request.USER.END_TASK, {
					taskId
				})
				DEBUG && console.log('撤销任务返回', res.data)
				if (res.data.statusCode == 200) {
					util.goBack()
				} else {
					util.showModal(res.data.errmsg)
				}
			},
			// 暂停/继续任务
			async stop(id) {
				let url = id == 0 ? request.USER.PAUSE_TASK : request.USER.CONTINUE_TASK
				let res = await request.post(url, {
					taskId
				})
				DEBUG && console.log('暂停或取消暂停任务返回', res.data)
				if (res.data.statusCode == 200) {
					util.goBack()
				} else {
					util.showModal(res.data.errmsg)
				}
			},
			// 删除任务
			del() {
				util.showModal('确定要永久删除当前任务？', async () => {
					let res = await request.post(request.USER.DEL_TASK, {
						taskId
					})
					DEBUG && console.log('删除任务返回', res.data)
					if (res.data.statusCode == 200) {
						util.goBack()
					} else {
						util.showModal(res.data.errmsg)
					}
				}, true)
			},
			// 人员选择
			userChose(type, id) {
				childDeviceId = id || ''
				util.navigate('/pages/user_choose/user_choose', {
					type,
					id: id || ''
				})
				this.key = type
			},
			// 删除视频
			deleteVideo(id) {
				this.video[id] = ''
				self.detail.components = JSON.parse(JSON.stringify(self.detail.components))
			},
			// 删除音频
			deleteVoice(id) {
				delete this.voice[id]
				self.detail.components = JSON.parse(JSON.stringify(self.detail.components))
			},
			// 子设备检查情况
			checkEvent(id, idx) {
				if (this.checkInfo[id] != idx) {
					this.checkInfo[id] = idx
					self.detail.components = JSON.parse(JSON.stringify(self.detail.components))
				}
			},
			// 获取任务详情
			async getTaskDetail() {
				let reqData = {
					taskId,
					uid
				}
				if(checkId){
					reqData.checkId = checkId
				}
				if(isCreate){
					reqData.isCreate = isCreate
				}
				let res = await request.get(request.USER.TASK_DETAIL, reqData)
				DEBUG && console.log('任务详情', res.data);
				if (res.data.statusCode == 200) {
					let temp = res.data.detail
					// 如果没有离线数据
					if (!offData || (offData && Object.keys(offData.checkInfo).length == 0)) {
						for (let i = 0; i < temp.components.length; i++) {
							let device = temp.components[i].device
							for (let j = 0; j < device.length; j++) {
								let child = device[j].child
								child.forEach(item => {
									this.showChild[item.taskComponentId] = 1
									self.checkInfo[item.taskComponentId] = 0
								})
							}
						}
					}
					DEBUG && console.log('结果', this.checkInfo, this.imgList, IMAGE_URL + '/' + res.data.detail.video);
					this.detail = res.data.detail
				} else {
					util.showModal(res.data.errmsg, () => {
						util.goBack()
					})
				}
			},
			// 预览图片
			previewImage1(idx1, idx2, idx3, idx4) {
				// console.log(this.detail.components[idx1].device[idx2].child[idx3].info.image);
				let list = this.detail.components[idx1].device[idx2].child[idx3].info.image.map(item => {
					return IMAGE_URL + '/' + item
				})
				// console.log('展示图片列表', list);
				uni.previewImage({
					urls: list,
					loop: true,
					current: idx4
				});
			},
			// 预览图片
			previewImage(idx) {
				let list = this.detail.image.map(item => {
					return IMAGE_URL + '/' + item
				})
				uni.previewImage({
					urls: list,
					loop: true,
					current: idx
				});
			},
			// 图片选择
			chooseImg(id, idx) {
				if (this.imgList[id] && this.imgList[id][idx]) {
					uni.previewImage({
						urls: this.imgList[id],
						loop: true,
						current: idx
					});
					return
				}
				uni.chooseImage({
					count: 4,
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: function(res) {
						DEBUG && console.log('图片选择', res);
						let temp = res.tempFilePaths
						let length = 4 - temp.length
						if (temp.length > 3) {
							self.imgList[id] = temp.slice(0, 4)
						} else {
							for (let i = 0; i < length; i++) {
								temp.push('')
							}
							self.imgList[id] = temp
						}
						self.detail.components = JSON.parse(JSON.stringify(self.detail.components))
					}
				})
			},
			// 删除图片
			deleteImg(id, idx) {
				this.imgList[id][idx] = ''
				self.detail.components = JSON.parse(JSON.stringify(self.detail.components))
			},
			// 选择视频
			chooseVideo(id) {
				if (!this.video[id]) {
					uni.chooseVideo({
						count: 1,
						maxDuration: 15,
						sourceType: ['camera', 'album'],
						success: function(res) {
							console.log('视频文件', res.tempFilePath);
							self.video[id] = res.tempFilePath;
							self.detail.components = JSON.parse(JSON.stringify(self.detail.components))
						}
					});
				}
			},
			// 录音url
			chooseAudio(id) {
				let src = this.voice[id] && this.voice[id].url
				if (src && innerAudioContext.src == src) {
					// 已经暂停
					if (innerAudioContext.paused) {
						// 播放
						innerAudioContext.play();
					} else {
						// 暂停
						innerAudioContext.pause();
					}
				} else if (src && innerAudioContext.src != src) {
					innerAudioContext.src = src
					innerAudioContext.play();
				} else if (!src) {
					// 如果当前正在录音则停止
					if (this.isRecording) {
						recorderManager.stop()
					} else {
						childDeviceId = id
						DEBUG && console.log('开始录音');
						self.count = 0
						// 最长15秒
						recorderManager.start({
							duration: 15000
						});
						// 录制中
						this.isRecording = 1
						timer = setInterval(() => {
							if (self.count < 15) {
								self.count += 1
							} else {
								clearInterval(timer)
							}
						}, 1000)
					}
				}
			},
			// 提交
			submit() {
				if (this.isRecording) {
					util.showModal('录音中不能提交')
					return
				}
				let files = []
				for (let key in this.imgList) {
					this.imgList[key].forEach((item, index) => {
						if (item) {
							files.push({
								idx: index,
								type: 'IMAGE',
								key: key,
								name: `image_${index}_${key}`,
								uri: item
							})
						}
					})
				}
				for (let key in this.video) {
					if (this.video[key]) {
						files.push({
							type: 'VIDEO',
							key: key,
							name: `video_${key}`,
							uri: this.video[key]
						})
					}
				}
				for (let key in this.voice) {
					if (this.voice[key]) {
						files.push({
							type: 'VOICE',
							key: key,
							name: `voice_${key}`,
							uri: this.voice[key].url
						})
					}
				}
				let fileData = {}
				// 如果有文件再传
				if (files.length > 0) {
					fileData = {
						files
					}
				}
				DEBUG && console.log('上传文件列表', files, fileData);
				let assist = choseInfo['assist'] || {}
				let cc = choseInfo['cc'] || {}
				let verify = choseInfo['verify'] || {}
				let assistUpdate = Object.keys(choseInfo['assistUpdate'] || {})
				let queryData = {
					check: JSON.stringify(this.checkInfo),
					assist: JSON.stringify(assist),
					voice: JSON.stringify(this.voice),
					cc: JSON.stringify(cc),
					verify: JSON.stringify(verify),
					assistUpdate: JSON.stringify(assistUpdate),
					excutePs
				}
				DEBUG && console.log('上传参数', queryData);
				util.showLoading('提交中...')
				uni.uploadFile({
					...fileData,
					filePath: '',
					name: '',
					url: SERVER_URL + '/user/taskSubmit', //仅为示例，非真实的接口地址
					header: {
						Authorization: `Bearer ${request.TOKEN}`
					},
					formData: queryData,
					success: (uploadFileRes) => {
						util.hideLoading()
						DEBUG && console.log(uploadFileRes.data);
						let res = JSON.parse(uploadFileRes.data)
						if (res.statusCode == 200) {
							util.goBack()
						} else {
							util.showModal(res.errmsg)
						}
					},
					fail: (err) => {
						util.showModal('上传失败,已为您自动保存数据', () => {
							util.goBack()
						})
						let fileList = []
						let imgList = self.imgList
						let voice = self.voice
						let video = self.video
						if (files.length > 0) {
							files.forEach((item, index) => {
								uni.saveFile({
									tempFilePath: item.uri,
									success: function(res) {
										// console.log('保存成功', res);
										if (item.type == 'IMAGE') {
											DEBUG && console.log('image', imgList, item.key);
											imgList[item.key][item.idx] = res.savedFilePath
										}
										if (item.type == 'VIDEO') {
											video[item.key] = res.savedFilePath
										}
										if (item.type == 'VOICE') {
											voice[item.key].url = res.savedFilePath
										}
										// 如果最后一个文件保存成功
										if (index == files.length - 1) {
											let appUrl = `/pages/check_verify/check_verify?id=${taskId}&uid=${uid}`
											let offlineInfo = {
												imgList,
												voice,
												video,
												checkInfo: self.checkInfo,
												choseInfo,
												userChoseInfo: self.userChoseInfo,
												appUrl
											}
											uni.setStorage({
												key: OFFLINE_KEY,
												data: offlineInfo
											});
											DEBUG && console.log('离线数据', offlineInfo);
										}
									}
								})
							})
						} else {
							let appUrl = `/pages/check_verify/check_verify?id=${taskId}&uid=${uid}`
							let offlineInfo = {
								checkInfo: self.checkInfo,
								choseInfo,
								userChoseInfo: self.userChoseInfo,
								appUrl
							}
							uni.setStorage({
								key: OFFLINE_KEY,
								data: offlineInfo
							});
							DEBUG && console.log('离线数据', offlineInfo);
						}
					}
				});
			}
		}
	}
</script>

<style scoped>
	.modal-content {
		width: 600rpx;
		height: 800rpx;
		background-color: #fff;
		border-radius: 10rpx;
		/* border: 1rpx solid red; */
	}

	.list-icon {
		width: 32rpx;
		height: 32rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
	}

	.name {
		width: 450rpx;
		font-weight: bold;
	}

	.user-item {
		font-size: 27rpx;
		color: #5786F7;
	}

	.info {
		width: 100%;
		min-height: 100rpx;
		font-size: 31rpx;
		border-bottom: 1rpx solid #E5E5E5;
	}

	.title {
		width: 130rpx;
		font-weight: bold;
		margin-left: 31rpx;
	}

	.title-content {
		width: 547rpx;
		font-size: 28rpx;
		min-height: 20rpx;
		margin-left: 5rpx;
	}

	.chose-icon {
		width: 30rpx;
		height: 30rpx;
		border-radius: 25rpx;
	}

	.chose-content {
		font-size: 28rpx;
		margin-left: 20rpx;
		color: #626262;
	}

	.title-content-input {
		max-width: 547rpx;
		margin: 33rpx 0;
		font-size: 27rpx;
		color: #626262;
		min-height: 43rpx;
		margin-right: 40rpx;
	}

	.division {
		width: 683rpx;
		height: 93rpx;
		font-size: 27rpx;
		background-color: #F2F2F2;
		margin-bottom: 53rpx;
	}

	.add-icon {
		width: 37rpx;
		height: 37rpx;
		border-radius: 37rpx;
		margin-right: 38rpx;
	}

	.hour {
		font-size: 27rpx;
		min-width: 140rpx;
		height: 60rpx;
		margin-right: 18rpx;
		background-color: #F2F2F2;
	}

	.question-content {
		width: 683rpx;
		min-height: 195rpx;
		background-color: #F2F2F2;
		margin-left: 31rpx;
		margin-bottom: 59rpx;
	}

	.question-content-input {
		width: 660rpx;
		height: 170rpx;
		font-size: 27rpx;
		color: #626262;
		min-height: 93rpx;
		padding: 5rpx 5rpx;
	}

	.btn {
		width: 120rpx;
		height: 70rpx;
		background-color: #5786F7;
		line-height: 70rpx;
		font-size: 27rpx;
		color: #fff;
		text-align: center;
		margin-right: 25rpx;
	}

	.upload {
		width: 683rpx;
		margin-left: 31rpx;
	}

	.upload-img {
		position: relative;
		width: 150rpx;
		height: 150rpx;
	}

	.child-upload-img {
		position: relative;
		width: 135rpx;
		height: 135rpx;
	}

	.upload-video {
		width: 327rpx;
		min-height: 150rpx;
		margin-bottom: 73rpx;
	}

	.child-upload-video {
		position: relative;
		width: 280rpx;
		min-height: 250rpx;
		margin-bottom: 73rpx;
	}

	.video {
		width: 327rpx;
		height: 150rpx;
	}

	.child-video {
		width: 100%;
		height: 150rpx;
	}

	.cycle {
		min-width: 101rpx;
		height: 60rpx;
		background-color: #F2F2F2;
	}

	.date {
		min-width: 399rpx;
		height: 60rpx;
		background-color: #F2F2F2;
	}

	.delete {
		position: absolute;
		right: -10rpx;
		top: -10rpx;
		width: 45rpx;
		height: 45rpx;
		z-index: 999;
	}

	.verify-btn {
		width: 220rpx;
		height: 63rpx;
		background-color: #5786F7;
		line-height: 63rpx;
		font-size: 27rpx;
		color: #fff;
		text-align: center;
		margin-right: 40rpx;
	}
</style>
