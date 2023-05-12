// * 定义用户基本类型
interface IUserBaseInfo {
  createTime: string;
  userName: string;
  userAvatar: string;
}
// * 定义问题类型
interface IQuestionRecord {
  question: {
    title: string;
    content: string;
    picture: string[];
  };
}
// * 定义答案类型
interface IAnswerRecord {
  answer: {
    comment: string;
    audio?: {
      url: string;
    };
  };
}

// 定义Mixin ：T和X的交叉类型
type Mixin<T, X> = T & X;

/**
 * * 拓展用户基本类型
 * 用泛型混入，方便之后还会出现什么数据也带有用户基础信息
 * 方便做拓展和复用
 */
type MixinUserBaseInfo<T> = Mixin<IUserBaseInfo, T>;

/**
 * *定义答题记录类型
 * question为用户基本信息和问题类型
 * answer为用户基本信息和答案类型
 */
interface IRecordConfig {
  question?: MixinUserBaseInfo<IQuestionRecord>;
  answer?: MixinUserBaseInfo<IAnswerRecord>;
}

// 最终使用的时候输列表数据
export type RecordConfigList = IRecordConfig[];
