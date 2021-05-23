interface KV<T> {
  [props: string]: T;
}

interface Window {
  ClipboardItem: any;
  TencentCaptcha: any;
}

type ClipboardItem = any;
type TencentCaptcha = any;

/**
 * Pick from T those types and make P optional
 * Partial will make every types optional
 * eg.
 * 	interface Person	{name: string; age: number; sex: boolean}
 * 	PartialIn<name, Persion> will return {name?: string; age: number; sex: boolean}
 *
 */
type PartialIn<P, T> = Omit<T, P> & Partial<Pick<T, P>>;

interface StyleComponent<T = string> {
  className?: T;
  style?: React.CSSProperties;
}

interface CommonResponse<T = {}> {
  status?: boolean;
  code: number;
  message: string;
  data: T;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
